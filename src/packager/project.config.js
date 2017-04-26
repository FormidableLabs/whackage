const fs = require('fs');
const projectConfigPath = `${process.cwd()}/rn-cli.config.js`;

if (fs.existsSync(projectConfigPath)) {
  module.exports = require(projectConfigPath);
} else {
  module.exports = {};
}
