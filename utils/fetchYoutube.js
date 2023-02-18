const axios = require('axios');

const baseUrl = 'https://youtube.googleapis.com/youtube/v3/';
const apiKey = process.env.YOUTUBE_API_KEY;

const fetchUploadsPlaylist = async (id) => {
  const url = `${baseUrl}channels?part=contentDetails&id=${id}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    const { totalResults } = data.pageInfo;

    if (!totalResults) {
      return null;
    }

    return data.items[0].contentDetails.relatedPlaylists.uploads;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  fetchUploadsPlaylist,
};
