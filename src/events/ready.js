const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[Bot] Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity('over the server', { type: 3 }); // Watching
  },
};
