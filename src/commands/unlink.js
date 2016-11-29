const assert = require('../util/assert');
const config = require('../util/config');

module.exports = function link({ packageName }) {
  assert.whackageJsonExists();
  config.update((whackage) => {
    whackage.dependencies = whackage.dependencies || {};
    delete whackage.dependencies[packageName];
    return whackage;
  });

  console.log(`unlinked ${packageName}`);
};
