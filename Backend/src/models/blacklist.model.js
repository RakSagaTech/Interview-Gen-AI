const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    require: [true, "Token in required to be added in the blacklist"]
  }
}, {
  timestamps: true
})


const tokenBlacklistModel = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = tokenBlacklistModel;