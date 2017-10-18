
const whackage = require('../util/config').read();
const projectConfig = require('./project.config');

const log = require('../util/log');

function getBlacklist() {
  var blacklist;

  // RN >= 0.47
  try {
    blacklist = require(`${process.cwd()}/node_modules/metro-bundler/src/blacklist`);
  } catch (e1) {
    try {
      blacklist = require(`${process.cwd()}/node_modules/metro-bundler/build/blacklist`);
    } catch (e2) {
      blacklist = require(`${process.cwd()}/node_modules/react-native/packager/blacklist`);
    }
  }

  return blacklist;
}

module.exports = Object.assign({}, projectConfig, {
  getBlacklistRE(platform) {
    const blacklist = getBlacklist();

    // blacklist dependencies' node modules to avoid duplicate module definitions
    const modules = Object.keys(whackage.dependencies).map(packageName =>
      new RegExp(`node_modules/${packageName}/node_modules/.*`)
    );

    var combined = modules;
    if (platform && platform.length) {
      combined = platform.concat(modules)
    }

    log.info(`blacklisted ${modules.length} dependencies`);

    // if the user has provided their own blacklist, use that instead
    if (typeof projectConfig.getBlacklistRE === 'function') {
      return projectConfig.getBlacklistRE(combined);
    } else {
      return blacklist(combined);
    }
  }
});
