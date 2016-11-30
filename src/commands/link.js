const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
const spawn = require('../util/spawn');
const path = require('path');

const SUCCESS = 0;

/*
 * Adds the package at given path to project's whackage.json.
 * The package name is read from the linked package's package.json,
 * but can be overidden with --name parameter if necessary.
 */
module.exports = function link({ relativePath, name }) {
  assert.whackageJsonExists();
  assert.isValidModule(relativePath);

  const absolutePath = path.resolve(relativePath);
  const packageName = name || require(path.join(absolutePath, 'package.json')).name;

  assert.isOwnDependency(packageName);

  // install transitive dependencies
  spawn('npm', ['install', relativePath], (code) => {
    if (code === SUCCESS) {

      // write entry in whackage.json
      config.update((whackage) => {
        whackage.dependencies = whackage.dependencies || {};
        whackage.dependencies[packageName] = relativePath;
        return whackage;
      });

      log.info(`linked ${packageName} -> ${absolutePath}`);
    } else {
      log.error(
        `Failed to install dependencies of ${packageName}. Fix the issue and re-run 'whack link'.`
      );
    }
  });


};
