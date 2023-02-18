const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unsubscribe')
    .setDescription(
      'Unsubscribe from a YouTube channel and stop all video notifications.'
    )
    .addStringOption((option) =>
      option
        .setName('channel-id')
        .setDescription(
          'The ID of the YouTube channel you want to unsubscribe from.'
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply('unsubscribe!');
  },
};
