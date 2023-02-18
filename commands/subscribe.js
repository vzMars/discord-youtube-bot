const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { fetchUploadsPlaylist } = require('../utils/fetchYoutube');
const Channel = require('../models/Channel');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('subscribe')
    .setDescription(
      'Subscribe to a YouTube channel to receive new video notifications.'
    )
    .addStringOption((option) =>
      option
        .setName('youtube-id')
        .setDescription(
          'The ID of the YouTube channel you want to receive notifications from.'
        )
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName('text-channel')
        .setDescription(
          'The text channel where all the notifications will go to.'
        )
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction) {
    const youtubeChannelID = interaction.options.getString('youtube-id');
    const { id } = interaction.options.getChannel('text-channel');
    const videoID = '';

    const { uploads, icon } = await fetchUploadsPlaylist(youtubeChannelID);

    if (!uploads) {
      return await interaction.reply(
        `Invalid Youtube Channel ID: ${youtubeChannelID}`
      );
    }

    try {
      const existingChannel = await Channel.findOne({ youtubeChannelID });

      if (existingChannel) {
        throw Error(
          `Already subscribed to channel with ID: ${youtubeChannelID}`
        );
      }

      await Channel.create({
        youtubeChannelID,
        uploadPlaylistID: uploads,
        icon,
        textChannelID: id,
        videoID,
      });

      await interaction.reply('Successfully subscribed to new channel!');
    } catch (error) {
      await interaction.reply(error.message);
    }
  },
};
