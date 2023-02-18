const { EmbedBuilder } = require('discord.js');

const createEmbed = (client, video) => {
  const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(video.title)
    .setURL(`https://www.youtube.com/watch?v=${video.videoId}`)
    .setAuthor({
      name: video.channelTitle,
      iconURL: video.icon,
      url: `https://www.youtube.com/channel/${video.channelId}`,
    })
    .setThumbnail(video.icon)
    .setImage(video.thumbnail)
    .setTimestamp();

  const channel = client.channels.cache.get(video.textChannelID);
  channel.send({ content: '@everyone', embeds: [embed] });
};

module.exports = {
  createEmbed,
};
