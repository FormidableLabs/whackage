const assert = require('../util/assert');
const config = require('../util/config');
const log = require('../util/log');
const path = require('path');

module.exports = function link({ relativePath, name }) {
  assert.whackageJsonExists();
  assert.isValidModule(relativePath);

  const absolutePath = path.resolve(relativePath);
  const packageName = name || require(path.join(absolutePath, 'package.json')).name;

  assert.isOwnDependency(packageName);

  config.update((whackage) => {
    whackage.dependencies = whackage.dependencies || {};
    whackage.dependencies[packageName] = relativePath;
    return whackage;
  });

  log.info(`linked ${packageName} -> ${absolutePath}`);
};
