const chalk = require('chalk');

function info(...messages) {
  console.log(chalk.cyan('[whackage]'), ...messages);
}

function error(...messages) {
  console.log(chalk.red('[whackage]'), ...messages);
}

module.exports = {
  info,
  error
};
