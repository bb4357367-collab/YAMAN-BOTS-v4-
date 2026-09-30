require('dotenv').config();
const { startBot } = require('./bot');
const { startDashboard } = require('./dashboard');

async function main() {
  console.log('Starting Discord Bot & Dashboard...');
  
  // Start the dashboard
  startDashboard();

  // Start the Discord bot
  startBot();
}

main().catch(console.error);
