const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
module.exports = function link({ packageName }) {
  assert.whackageJsonExists();
  config.update((whackage) => {
    whackage.dependencies = whackage.dependencies || {};
    delete whackage.dependencies[packageName];
    return whackage;
  });

  log.info(`unlinked ${packageName}`);
};
