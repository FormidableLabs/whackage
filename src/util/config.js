const fs = require('fs');
const path = require('path');

function filepath() {
  return path.join(process.cwd(), 'whackage.json');
}

function exists() {
  return fs.existsSync(filepath());
}

function read() {
  return require(filepath());
}

function write(contents) {
  const indentation = 2;
  fs.writeFileSync(filepath(), JSON.stringify(contents, null, indentation));
}

function update(fn) {
  write(fn(read()));
}

module.exports = {
  filepath,
  exists,
  read,
  write,
  update
};
