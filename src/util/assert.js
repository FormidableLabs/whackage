const fs = require('fs');
const path = require('path');
const config = require('./config');
const log = require('./log');

function exitWith(message) {
  log.error(message);
  process.exit(1);
}

function whackageJsonExists() {
  if (!config.exists()) {
    exitWith('No whackage.json found, run whack init');
  }
}

function whackageJsonDoesntExist() {
  if (config.exists()) {
    exitWith('whackage.json already exists!');
  }
}

function isValidModule(directory) {
  if (!(
    fs.existsSync(path.resolve(process.cwd(), directory)) &&
    fs.existsSync(path.resolve(process.cwd(), directory, 'package.json'))
  )) {
    exitWith(`Directory at path ${directory} is not a valid npm module`);
  }
}

module.exports = {
  whackageJsonExists,
  whackageJsonDoesntExist,
  isValidModule
};
