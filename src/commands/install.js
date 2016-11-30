const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
const spawn = require('../util/spawn');

const SUCCESS = 0;

module.exports = function link({ packageName = null }) {
  assert.whackageJsonExists();

  const whackage = config.read();
  if (packageName && !(packageName in whackage.dependencies)) {
    assert.exitWith(`Package ${packageName} not linked in whackage.json`);
  }

  const paths = packageName
    ? [whackage.dependencies[packageName]]
    : Object.keys(whackage.dependencies).map((key) => whackage.dependencies[key]);

  log.info('Installing dependencies from', ...paths);

  spawn('npm', ['install', ...paths], (code) => {
    if (code === SUCCESS) {
      log.info('Successfully installed linked dependencies');
    } else {
      log.error(
        'Failed to install dependencies. Fix the issue and re-run \'whack install\'.'
      );
    }
  });


};
