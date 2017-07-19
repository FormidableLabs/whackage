const blacklist = require(`${process.cwd()}/node_modules/react-native/metro-bundler/build/blacklist`);
const whackage = require('../util/config').read();
const projectConfig = require('./project.config');

const log = require('../util/log');
module.exports = Object.assign({}, projectConfig, {
  getBlacklistRE(platform = []) {
    // blacklist dependencies' node modules to avoid duplicate module definitions
    const modules = Object.keys(whackage.dependencies).map(
      packageName => new RegExp(`node_modules/${packageName}/node_modules/.*`),
    );

    const combined = platform.concat(modules);

    log.info(`blacklisted ${modules.length} dependencies`);

    // if the user has provided their own blacklist, use that instead
    if (typeof projectConfig.getBlacklistRE === 'function') {
      return projectConfig.getBlacklistRE(combined);
    } else {
      return blacklist(combined);
    }
  },
});
