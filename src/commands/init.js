const assert = require('../util/assert');
const config = require('../util/config');

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

  console.log('Created whackage.json in the current directory.');
  console.log('Run `whack link <relativePath>` to link your first module.');
};
