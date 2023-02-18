const axios = require('axios');
const schedule = require('node-schedule');
const Channel = require('../models/Channel');
const { createEmbed } = require('../utils/createEmbed');

const baseUrl = 'https://youtube.googleapis.com/youtube/v3/';
const apiKey = process.env.YOUTUBE_API_KEY;

const fetchUploadsPlaylist = async (id) => {
  const url = `${baseUrl}channels?part=snippet&part=contentDetails&id=${id}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    const { totalResults } = data.pageInfo;

    if (!totalResults) {
      return { uploads: null, icon: null };
    }

    const { uploads } = data.items[0].contentDetails.relatedPlaylists;
    const icon = data.items[0].snippet.thumbnails.high.url;

    return { uploads, icon };
  } catch (err) {
    console.error(err);
  }
};

const fetchLatestVideos = (client) => {
  schedule.scheduleJob('*/5 * * * *', async () => {
    try {
      const channels = await Channel.find();
      for (const channel of channels) {
        const videoUrl = `${baseUrl}playlistItems?part=snippet&playlistId=${channel.uploadPlaylistID}&key=${apiKey}`;
        const response = await axios.get(videoUrl);
        const { snippet } = response.data.items[0];
        const { title, channelTitle, channelId } = snippet;
        const { url } = snippet.thumbnails.maxres;
        const { videoId } = snippet.resourceId;

        const video = {
          title,
          channelTitle,
          channelId,
          icon: channel.icon,
          thumbnail: url,
          videoId,
          textChannelID: channel.textChannelID,
        };

        if (channel.videoID !== video.videoId) {
          channel.videoID = video.videoId;
          await channel.save();

          createEmbed(client, video);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  fetchUploadsPlaylist,
  fetchLatestVideos,
};
