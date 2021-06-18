/* eslint-disable import/prefer-default-export */
// const path = require('path');
const pkg = require('../package.json');

const databaseDirectory = './databases';
const migrationDirectory = './databases/migrations';
const seederDirectory = './databases/seeders';

/** return {string} */
const buildInfo = `Parse DBTool v${pkg.version} - Parse server tool for data migration and seeding.`;

module.exports = {
  databaseDirectory,
  migrationDirectory,
  seederDirectory,
  buildInfo,
};
