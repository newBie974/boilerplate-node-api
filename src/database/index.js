const pg = require('pg');
const config = require('../config');

const db = new pg.Pool(config.postgres)
  .on('error', () => process.exit(0));

module.exports = db;
