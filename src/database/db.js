const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let db;

async function initDb() {
  db = await open({
    filename: path.resolve(__dirname, '../../database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 0,
      balance INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS config (
      guild_id TEXT PRIMARY KEY,
      welcome_channel TEXT,
      log_channel TEXT
    );

    CREATE TABLE IF NOT EXISTS tickets (
      ticket_id TEXT PRIMARY KEY,
      guild_id TEXT,
      user_id TEXT,
      channel_id TEXT,
      status TEXT DEFAULT 'open'
    );

    CREATE TABLE IF NOT EXISTS warnings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guild_id TEXT,
      user_id TEXT,
      moderator_id TEXT,
      reason TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS giveaways (
      message_id TEXT PRIMARY KEY,
      channel_id TEXT,
      guild_id TEXT,
      prize TEXT,
      winners_count INTEGER,
      end_time DATETIME
    );
  `);
  console.log('[Database] SQLite database initialized successfully.');
}

module.exports = {
  initDb,
  getDb: () => db
};
