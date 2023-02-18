const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  youtubeChannelID: {
    type: String,
    unique: true,
  },
  uploadPlaylistID: {
    type: String,
    unique: true,
  },
  textChannelID: {
    type: String,
  },
  videoID: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('Channel', ChannelSchema);
