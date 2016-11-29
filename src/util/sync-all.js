const path = require('path');
const rsync = require('rsyncwrapper');

module.exports = function syncAll(rootPath, source, name) {
  const options = {
    src: `${source}/`,
    dest: path.join(rootPath, 'node_modules', name),
    exclude: ['node_modules/*'],
    recursive: true
  };

  rsync(options, (error) => {
    if (error) {
      console.error('error', error);
      return;
    }

    console.log('[whack]', 'init', source, '->', path.join('node_modules', name));
  });
};
