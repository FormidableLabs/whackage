const chalk = require('chalk');

function info(message) {
  console.log(chalk.cyan('[whackage]'), message);
}

function error(message) {
  console.log(chalk.red('[whackage]'), message);
}

module.exports = {
  info,
  error
};
