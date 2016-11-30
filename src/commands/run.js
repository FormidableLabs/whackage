const path = require('path');
const commandExists = require('command-exists');

const whack = require('../util/whack');
const spawn = require('../util/spawn');
const log = require('../util/log');

module.exports = function run({ npmScript }) {

  const cliConfigPath = path.resolve(__dirname, '../packager/rn-cli.config.js');

  commandExists('rsync', (error, rsyncExists) => {
    if (!error && rsyncExists) {
      whack();
      spawn('npm', [npmScript, '--', '--config', cliConfigPath], (code) => {
        process.exit(code);
      });
    } else {
      log.error(
        'Could\'t find `rsync`. Install it using your favorite package manager and try again'
      );
    }

  });
};
