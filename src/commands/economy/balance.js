const { SlashCommandBuilder } = require('discord.js');
const { getDb } = require('../../database/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your or another user\\'s balance.')
    .addUserOption(option => 
      option.setName('target').setDescription('The user to check the balance of')
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('target') || interaction.user;
    const db = getDb();

    let user = await db.get('SELECT * FROM users WHERE user_id = ?', [target.id]);

    if (!user) {
      await db.run('INSERT INTO users (user_id, balance) VALUES (?, ?)', [target.id, 0]);
      user = { balance: 0 };
    }

    await interaction.reply(`${target.username}'s balance is **${user.balance}** coins.`);
  },
};
