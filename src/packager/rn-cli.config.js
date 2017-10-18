
const whackage = require('../util/config').read();
const projectConfig = require('./project.config');

const log = require('../util/log');
const path = require('path');

const rnVersion = require(path.join(process.cwd(), 'package.json')).dependencies['react-native']

function getBlacklist() {
  // RN >= 0.47
  let blacklist = 'metro-bundler/src/blacklist';

  if (rnVersion.indexOf('0.46') > -1) {
    blacklist = 'metro-bundler/build/blacklist';
  } else if (rnVersion.indexOf('0.45') > -1) {
    blacklist = 'react-native/packager/blacklist';
  }

  return require(`${process.cwd()}/node_modules/${blacklist}`);
}

module.exports = Object.assign({}, projectConfig, {
  getBlacklistRE(platform = []) {
    const blacklist = getBlacklist();

    // blacklist dependencies' node modules to avoid duplicate module definitions
    const modules = Object.keys(whackage.dependencies).map(packageName =>
      new RegExp(`node_modules/${packageName}/node_modules/.*`)
    );

    const combined = platform.concat(modules);

    log.info(`blacklisted ${modules.length} dependencies`);

    // if the user has provided their own blacklist, use that instead
    if (typeof projectConfig.getBlacklistRE === 'function') {
      return projectConfig.getBlacklistRE(combined);
    } else {
      return blacklist(combined);
    }
  }
});
