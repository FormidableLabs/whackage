const blacklist = require(`${process.cwd()}/node_modules/react-native/packager/blacklist`);
const whackage = require('../util/config').read();

module.exports = {
  getBlacklistRE(platform) {
    const modules = Object
      .keys(whackage.dependencies)
      .map((packageName) =>
        new RegExp(`node_modules/${packageName}/node_modules/.*`)
      );

    console.log('[whack]', `blacklisted ${modules.length} dependencies`);
    return blacklist(
      platform,
      modules
    );
  }
};
