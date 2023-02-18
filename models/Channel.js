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
  icon: {
    type: String,
  },
  textChannelID: {
    type: String,
  },
  videoID: {
    type: String,
  },
});

module.exports = mongoose.model('Channel', ChannelSchema);
