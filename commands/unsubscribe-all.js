const { SlashCommandBuilder } = require('discord.js');
const Channel = require('../models/Channel');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unsubscribe-all')
    .setDescription(
      'Unsubscribe from all YouTube channels and stop all video notifications.'
    ),
  async execute(interaction) {
    try {
      const channels = await Channel.find();

      if (!channels?.length) {
        throw Error(`You're not subscribed to any channels.`);
      }

      const { deletedCount } = await Channel.deleteMany();

      await interaction.reply(
        `Successfully unsubscribed from ${deletedCount} ${
          deletedCount === 1 ? 'channel' : 'channels'
        }!`
      );
    } catch (error) {
      await interaction.reply(error.message);
    }
  },
};
