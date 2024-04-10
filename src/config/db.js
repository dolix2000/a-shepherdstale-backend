/**
 * JS File for connecting to localhost or heroku based on the environment.
 * If mode == 'development' then we are connected to localhost and can test queries.
 * Else connect to heroku.
 */

const { Pool } = require('pg');

require('dotenv').config();

let connString = process.env.DATABASE_URL;

function escapeIdentifier(identifier) {
  return `"${identifier.replace(/"/g, '""')}"`;
}

// setting up localhost with credentials
const localhost = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

// connect to localhost
const localPool = new Pool(localhost);

// remote pool for connecting to heroku
const remotePool = new Pool({
    connectionString: connString,
    ssl: {
      // heroku does not support client-side certificate validation to its postgres dbs
      // unless using private spaces or shield
      rejectUnauthorized: false 
    }
  });

let pool = (process.env.NODE_ENV === 'development') ? localPool : remotePool;

module.exports = { pool, escapeIdentifier };