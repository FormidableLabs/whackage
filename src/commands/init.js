const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');

const defaultConfig = {
  include: '/**/*.js',
  exclude: ['/node_modules/*', '.babelrc'],
  dependencies: {}
};

module.exports = function init({ force }) {
  if (!force) {
    assert.whackageJsonDoesntExist();
  }

  config.write(defaultConfig);

  log.info('Created whackage.json in the current directory.');
  log.info('Run `whack link <relativePath>` to link your first module.');
};
