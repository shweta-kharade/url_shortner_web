const { nanoid } = require("nanoid");
const Url = require("../models/Url");
const Click = require("../models/Click");
const redisClient = require("../config/redis");

const CODE_LENGTH = 7;
const CACHE_TTL_SECONDS = 3600;

async function generateUniqueShortCode() {
  let shortCode;

  let exists = true;

  while (exists) {
    shortCode = nanoid(CODE_LENGTH);

    exists = await Url.exists({ shortCode }); // check for collision
  }

  return shortCode;
}

exports.createShortUrl = async (req, res) => {
  const { originalUrl, customAlias, expiresAt } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }

  try {
    let shortCode;

    if (customAlias) {
      const aliasTaken = await Url.exists({ shortCode: customAlias });
      if (aliasTaken) {
        res.status(409).json({ error: "Alias already taken" });
      }

      shortCode = customAlias;
    } else {
      shortCode = await generateUniqueShortCode();
    }

    const url = await Url.create({
      originalUrl,
      shortCode,
      expiresAt: expiresAt || null,
      userId: req.userId || null
    });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      originalUrl: url.originalUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirectToUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    //1. check cache first
    const cached = await redisClient.get(`url:${shortCode}`);

    if (cached) {
      const { id, originalUrl, expiresAt } = JSON.parse(cached);

      if (expiresAt && new Date(expiresAt) < new Date()) {
        return res.status(410).json({ error: "This link has expired" });
      }

      res.redirect(originalUrl);
      Url.updateOne({ shortCode }, { $inc: { clicks: 1 } }).catch(
        console.error,
      );
      
      Click.create({
        urlId: id,
        referrer: req.get("Referrer") || null,
        userAgent: req.get("User-Agent") || null,
        ip: req.ip,
      }).catch(console.error);
      return;
    }

    //2. cache miss: fall back to DB
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (url.expiresAt && url.expiresAt < Date.now()) {
      return res.status(410).json({ error: "This link has expired" });
    }

    //3. populate cache for next time
    await redisClient.setEx(
      `url : ${shortCode}`,
      CACHE_TTL_SECONDS,
      JSON.stringify({
        id: url._id,
        originalUrl: url.originalUrl,
        expiresAt: url.expiresAt,
      }),
    );

    // fire the redirect immediately
    res.redirect(url.originalUrl);

    // log analytics AFTER responding — doesn't block the user
    Url.updateOne({ shortCode }, { $inc: { clicks: 1 } }).catch(console.error);
    logClick(req, shortCode);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

function logClick(req, shortCode) {
  Url.findOne({ shortCode }).then((url) => {
    if (url) {
      Click.create({
        urlId: url._id,
        referrer: req.get("Referrer") || null,
        userAgent: req.get("User-Agent") || null,
        ip: req.ip,
      }).catch(console.error);
    }
  });
}

exports.getMyLinks = async(req, res) => {
  try {
    const links = await Url.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('shortCode originalUrl clicks createdAt expiresAt');

    console.log(links);
    res.json(links)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}
