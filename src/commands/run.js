const path = require('path');
const commandExists = require('command-exists');

const startServer = require('../util/start-server');
const spawn = require('../util/spawn');
const log = require('../util/log');

/*
 * Starts the whackage file watcher service and the react native packager
 */
module.exports = function run(opts) {

  // rn-cli.config.js is the react native packager configuration file used to
  // blacklist dependencies' node modules to avoid @providesModule naming collisions
  const cliConfigPath = path.resolve(__dirname, '../packager/rn-cli.config.js');

  commandExists('rsync', (error, rsyncExists) => {
    if (!error && rsyncExists) {
      startServer();
      spawn('npm', ['run', opts.npmScript, '--', '--config', cliConfigPath].concat(opts.arguments || []), (code) => {
        process.exit(code);
      });

    } else {
      log.error(
        'Could\'t find `rsync`. Install it using your favorite package manager and try again'
      );
    }

  });
};
