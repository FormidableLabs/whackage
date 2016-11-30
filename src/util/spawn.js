const childProcess = require('child_process');

module.exports = function spawn(task, args, onClose) {
  const child = childProcess.spawn('npm', args, {
    stdio: 'inherit'
  });

  child.on('close', (code) => {
    onClose(code);
  });
};
