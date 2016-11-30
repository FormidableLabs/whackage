const path = require('path');
const fs = require('fs-extra');
const log = require('./log');

// eslint-disable-next-line max-params
module.exports = function syncFile(event, filename, source, dest) {
  const done = (error) => {
    if (error) {
      log.error(error);
      return;
    }
    log.info(event, path.join(dest, filename));
  };

  if (event === 'unlink') {
    fs.unlink(path.join(dest, filename), done);
  } else {
    fs.copy(
      path.join(source, filename),
      path.join(dest, filename),
      done
    );
  }
};
