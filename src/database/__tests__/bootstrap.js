const path = require('path');
const fs = require('fs');
const database = require('../../database');

const buildDB = fs.readFileSync(path.resolve(__dirname, './database/bootstrapDB.sql')).toString();
const populateDB = fs.readFileSync(path.resolve(__dirname, './database/bootstrapData.sql')).toString();

beforeEach(async () => {
  await database.query(buildDB);
  await database.query(populateDB);
});

afterAll(() => {
  database.end();
});
