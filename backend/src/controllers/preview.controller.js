// backend/src/controllers/preview.controller.js
const axios = require('axios');
const cheerio = require('cheerio');

exports.getPreview = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url is required' });

  try {
    const response = await axios.get(url, { timeout: 4000, maxContentLength: 1_000_000 });
    const $ = cheerio.load(response.data);
    const title = $('title').first().text() || null;
    const favicon = $('link[rel="icon"]').attr('href') || '/favicon.ico';

    res.json({ title, favicon: new URL(favicon, url).href });
  } catch (err) {
    res.json({ title: null, favicon: null }); // fail silently — preview is a nicety, not critical
  }
};