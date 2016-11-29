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
    'unlink npm module',
    {},
    require('./src/commands/unlink')
  )
  .command(
    'run <npmScript>',
    'run react native packager in whack mode',
    {},
    require('./src/commands/run')
  )
  .help();

yargs.argv; //eslint-disable-line no-unused-expressions
