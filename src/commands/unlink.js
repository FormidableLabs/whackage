const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');

/*
 * Remove a package from whackage.json by name
 */
module.exports = function unlink({ packageName }) {
  assert.whackageJsonExists();
  config.update((whackage) => {
    whackage.dependencies = whackage.dependencies || {};
    delete whackage.dependencies[packageName];
    return whackage;
  });

  log.info(`unlinked ${packageName}`);
};
