const packagerPath = `${process.cwd()}/node_modules/react-native/packager`;
const blacklist = require(`${packagerPath}/blacklist`);
const providesModuleNodeModules = require(`${packagerPath}/defaults`).providesModuleNodeModules;
const whackage = require('../util/config').read();
const log = require('../util/log');
module.exports = {
  getBlacklistRE() {
    const modules = Object
      .keys(whackage.dependencies)
      .map((packageName) =>
        new RegExp(`node_modules/${packageName}/node_modules/.*`)
      );

    log.info(`blacklisted ${modules.length} dependencies`);
    return blacklist(modules);
  },

  getProvidesModuleNodeModules() {
    log.info(`providing ${Object.keys(whackage.dependencies).join(', ')} from node modules`);
    return providesModuleNodeModules.concat(Object.keys(whackage.dependencies));
  },
};
