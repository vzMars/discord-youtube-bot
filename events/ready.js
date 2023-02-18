const { Events } = require('discord.js');
const { fetchLatestVideos } = require('../utils/fetchYoutube');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    fetchLatestVideos(client);
  },
};
