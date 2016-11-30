const path = require('path');
const whack = require('../util/whack');
const spawn = require('../util/spawn');

module.exports = function run({ npmScript }) {

  const cliConfigPath = path.resolve(__dirname, '../packager/rn-cli.config.js');

  spawn('npm', [npmScript, '--', '--config', cliConfigPath], (code) => {
    process.exit(code);
  });

  whack();
};
