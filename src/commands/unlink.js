const fs = require('fs-extra');
const path = require('path');
const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
const spawn = require('../util/spawn');
/*
 * Remove a package from whackage.json by name
 */
module.exports = function unlink(opts) {
  const packageName = opts.packageName;
  assert.whackageJsonExists();

  fs.remove(path.resolve(process.cwd(), 'node_modules', packageName), (error) => {
    spawn('npm', ['install'], (code) => {
      config.update((whackage) => {
        whackage.dependencies = whackage.dependencies || {};
        delete whackage.dependencies[packageName];
        return whackage;
      });

      if (error || code !== 0) {
        log.error(`unlinked ${packageName}, but your node_modules may not have reset correctly.`);
        log.error('run `rm -rf node_modules && npm i` to ensure consistent dependencies');
      } else {
        log.info(`unlinked ${packageName}`);
      }
    });
  });
};
