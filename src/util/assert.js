const fs = require('fs');
const path = require('path');
const isSymlink = require('is-symlink');

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

function isOwnDependency(packageName) {
  const packageJSON = require(path.resolve(process.cwd(), 'package.json'));
  const dependencies = Object.assign({},
    packageJSON.dependencies || {},
    packageJSON.devDependencies || {}
  );

  if (!dependencies[packageName]) {
    exitWith(`Package ${packageName} is not a registered dependency in ${packageJSON.name}`);
  }
}

function isSymlinked(packageName) {
  const packagePath = path.resolve(process.cwd(), 'node_modules', packageName);
  return isSymlink.sync(packagePath)
}

module.exports = {
  exitWith,
  whackageJsonExists,
  whackageJsonDoesntExist,
  isValidModule,
  isOwnDependency,
  isSymlinked
};
