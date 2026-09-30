const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const path = require('path');
const fs = require('fs');
const { initDb } = require('./database/db'); 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
  ],
});

client.commands = new Collection();
client.events = new Collection();

// Setup discord-player
const player = new Player(client);

async function startBot() {
  await initDb();
  await player.extractors.loadDefault();
  
  // Load Handlers
  const handlersPath = path.join(__dirname, 'handlers');
  if (fs.existsSync(handlersPath)) {
    const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));
    for (const file of handlerFiles) {
      require(path.join(handlersPath, file))(client);
    }
  }

  // Login
  if (!process.env.DISCORD_TOKEN || process.env.DISCORD_TOKEN === 'your_bot_token_here') {
    console.warn('[Warning] No valid DISCORD_TOKEN provided in .env, bot will not connect to Discord.');
    return;
  }
  
  client.login(process.env.DISCORD_TOKEN);
}

module.exports = { startBot, client, player };
