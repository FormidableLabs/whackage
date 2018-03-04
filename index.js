#!/usr/bin/env node
const yargs = require('yargs');
yargs
  .command(
    'init',
    'create a whackage.json in the current directory',
    {},
    require('./src/commands/init')
  )
  .command(
    'link <relativePath>',
    'link npm module at given path',
    {},
    require('./src/commands/link')
  )
  .command(
    'unlink <packageName>',
    'unlink npm module by name',
    {},
    require('./src/commands/unlink')
  )
  .command(
    'install [packageName]',
    'update the depencies of linked modules',
    {},
    require('./src/commands/install')
  )
  .command(
    'run <npmScript> [arguments...]',
    'start whack server',
    {},
    require('./src/commands/run')
  )
  .help();

yargs.argv; //eslint-disable-line no-unused-expressions
