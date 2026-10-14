// src/models/Click.js
const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
    required: true,
    index: true // we'll query "all clicks for this urlId" constantly
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  referrer: String,
  userAgent: String,
  ip: String // useful for rough geo-lookup later
});

module.exports = mongoose.model('Click', clickSchema);