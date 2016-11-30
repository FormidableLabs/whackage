const path = require('path');
const childProcess = require('child_process');
const whack = require('../util/whack');

module.exports = function run({ npmScript }) {

  const cliConfigPath = path.resolve(__dirname, '../packager/rn-cli.config.js');

  // spawn a packager process
  const packager = childProcess.spawn('npm', [npmScript, '--', '--config', cliConfigPath], {
    stdio: 'inherit'
  });

  packager.on('close', (code) => {
    process.exit(code);
  });

  whack();
};
