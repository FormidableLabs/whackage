const path = require('path');
const rsync = require('rsyncwrapper');
const log = require('./log');

// eslint-disable-next-line max-params
module.exports = function syncAll(rootPath, source, name, exclude) {
  const options = {
    src: `${source}/`,
    dest: path.join(rootPath, 'node_modules', name),
    exclude,
    recursive: true
  };

  rsync(options, (error) => {
    if (error) {
      console.error('error', error);
      return;
    }

    log.info(`init ${source} -> ${path.join('node_modules', name)}`);
  });
};
