const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,   // enforced at the DB level — critical for correctness
    index: true     // speeds up lookups, which happen on EVERY redirect
  },
  clicks: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  }
});


module.exports = mongoose.model('Url', urlSchema);