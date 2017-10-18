const path = require('path');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const assert = require('./assert');
const syncAll = require('./sync-all');
const syncFile = require('./sync-file');
const config = require('./config');

/*
 * Starts the whackage file watching service. Syncs the whole directories
 * when the service is started, and as files are changed, copies individual
 * file modifications one by one
 */
module.exports = function startServer() {

  const ROOT_PATH = process.cwd();

  const whackage = config.read();
  const include = whackage.include;
  const exclude = whackage.exclude;
  const packages = Object.keys(whackage.dependencies);

  const directories = packages
    .map((key) => whackage.dependencies[key])
    .map((dir) => dir + include);

  const packageLookup = packages
    .reduce((lookup, key) => {
      lookup[path.resolve(whackage.dependencies[key])] = key;
      return lookup;
    }, {});

  // initial sync
  for (const key in packageLookup) {
    if (packageLookup.hasOwnProperty(key)) {
      if (assert.isSymlinked(packageLookup[key])) {
        const packagePath = path.resolve(process.cwd(), 'node_modules', packageLookup[key]);
        fs.removeSync(packageLookup[key]);
      }
      syncAll(ROOT_PATH, key, packageLookup[key], exclude);
    }
  }

  const dir = (p) => p.endsWith('/') ? p : `${p}/`;
  const watcher = chokidar.watch(directories, {
    ignoreInitial: true,
    ignore: exclude
  });

  watcher.on('all', (event, changedPath) => {
    const sourcePath = path.resolve(path.dirname(changedPath));
    const sourceFile = path.basename(changedPath);
    let packageRoot;
    let packageName;
    for (const key in packageLookup) {
      if (packageLookup.hasOwnProperty(key) && dir(sourcePath).startsWith(dir(key))) {
        packageRoot = key;
        packageName = packageLookup[key];
        break;
      }
    }

    const relativePath = path.relative(
      path.resolve(packageRoot),
      sourcePath
    );

    const targetPath = path.join(
      ROOT_PATH,
      'node_modules',
      packageName,
      relativePath
    );

    syncFile(event, sourceFile, sourcePath, targetPath);
  });
};
