// src/controllers/analytics.controller.js
const Url = require('../models/Url');
const Click = require('../models/Click');

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: 'Not found' });

    const totalClicks = url.clicks;

    const clicksOverTime = await Click.aggregate([
      { $match: { urlId: url._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const topReferrers = await Click.aggregate([
      { $match: { urlId: url._id } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ totalClicks, clicksOverTime, topReferrers });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};