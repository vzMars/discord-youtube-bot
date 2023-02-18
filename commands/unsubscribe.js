const { SlashCommandBuilder } = require('discord.js');
const Channel = require('../models/Channel');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unsubscribe')
    .setDescription(
      'Unsubscribe from a YouTube channel and stop all video notifications.'
    )
    .addStringOption((option) =>
      option
        .setName('youtube-id')
        .setDescription(
          'The ID of the YouTube channel you want to unsubscribe from.'
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const youtubeChannelID = interaction.options.getString('youtube-id');

    try {
      const existingChannel = await Channel.findOne({ youtubeChannelID });

      if (!existingChannel) {
        throw Error(
          `You're not subscribed to any channel with ID: ${youtubeChannelID}`
        );
      }

      await existingChannel.remove();

      await interaction.reply('Successfully unsubscribed!');
    } catch (error) {
      await interaction.reply(error.message);
    }
  },
};
