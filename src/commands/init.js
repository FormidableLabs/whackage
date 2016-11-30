const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');

const defaultConfig = {
  // By default we only watch .js source files
  include: '/**/*.js',

  exclude: [
    // We do not want to sync node_modules. To sync changes to dependencies,
    // use `whack install`
    '/node_modules/*',

    // Babel configuration should not be copied to avoid issues with
    // locally installed not being present in the node_modules, which
    // we do not syncronise. React Native packager does not support
    // different presets for depdendencies anyway, do if the dependency
    // does not correctly transpile with the parent's Babel config,
    // the sources should be compiled and minified anyway
    '.babelrc',

    // Syncing git repos is unnecessary, and prevents npm from installing
    // on top of the whacked directory
    '.git'
  ],
  dependencies: {}
};

/*
 * Create a new whackage.json in current directory
 */
module.exports = function init({ force }) {
  if (!force) {
    assert.whackageJsonDoesntExist();
  }

  config.write(defaultConfig);

  log.info('Created whackage.json in the current directory.');
  log.info('Run `whack link <relativePath>` to link your first module.');
};
