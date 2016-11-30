const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
const spawn = require('../util/spawn');

const SUCCESS = 0;

/*
 * Install the npm dependendencies of a named package, or all
 * linked packages, into the current project
 */
module.exports = function install({ packageName = null }) {
  assert.whackageJsonExists();

  const whackage = config.read();

  // we expect the package to be part of the project's whackage.json
  if (packageName && !(packageName in whackage.dependencies)) {
    assert.exitWith(`Package ${packageName} not linked in whackage.json`);
  }

  // if package name is provided, install dependencies of that package.
  // otherwise install all linked packages
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
