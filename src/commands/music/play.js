const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from YouTube, Spotify, etc.')
    .addStringOption(option => 
      option.setName('query')
        .setDescription('The song URL or search query')
        .setRequired(true)
    ),
  async execute(interaction) {
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply({ content: 'You are not connected to a voice channel!', ephemeral: true }); // make sure we have a voice channel
    if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
      return interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
    }
    const query = interaction.options.getString('query', true);

    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          metadata: interaction,
          leaveOnEnd: true,
          leaveOnEmpty: true,
        }
      });

      return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      console.log(`Error playing song: ${e}`);
      return interaction.followUp(`Something went wrong: ${e.message}`);
    }
  },
};
