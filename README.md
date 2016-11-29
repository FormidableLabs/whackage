<h1 align="center">whackage</h1>

<p align="center">
  <a title='License' href="https://raw.githubusercontent.com/FormidableLabs/whackage/master/LICENSE">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a href="https://badge.fury.io/js/whackage">
    <img src="https://badge.fury.io/js/whackage.svg" alt="npm version" height="18">
  </a>
</p>

<h4 align="center">
  Multi-repo development tooling for React Native
</h4>

***

### What is this?

**`whackage` provides a hot-reload-friendly workflow for working across multiple React Native packages**

React Native packager, the development server that bundles your app's JavaScript sources, has a few rough
edges when it comes to developing apps and libraries that span across multiple repositories. It doesn't
[handle symlinks](https://productpains.com/post/react-native/symlink-support-for-packager) reliably, and the 
[Haste module system](https://github.com/facebookarchive/node-haste/tree/master) gets easily confused by
`@providesModule` declarations in subdependencies.

`whackage` synchronizes changes in your local workspace to your project's `node_modules` without using symlinks, and automatically generates a packager blacklist for linked modules to avoid Haste naming collisions. 

We wrote `whackage` to scratch our own itch when working on [Victory Native](https://github.com/formidablelabs/victory-native). It's a blunt instrument, but it works
well. Hope you find it useful!

### How-to

#### Install 

Install `whackage` globally:
```sh
npm i -g whackage
```

You'll now have access to the `whack` command on your command line. To get started, generate an empty 
`whackage.json` in your project's root directory:
```sh
whack init
```

#### Link modules

You can then link local copies of React Native libraries to your project with `whack link <path>`, e.g.:
```
whack link ../victory-core-native
whack link ../victory-chart-native
```

`whackage` doesn't install and flatten transitive dependencies, so any linked libraries need to have been 
previously installed with `npm install` / `yarn`. Typically you would use `whackage` to make changes to libraries
which are already defined in your `package.json` dependencies.

You'll now have a `whackage.json` file that looks as follows:
```json
{
  "include": "/**/*.js",
  "exclude": "/node_modules/*",
  "dependencies": {
    "victory-chart-native": "../victory-chart-native",
    "victory-core-native": "../victory-core-native"
  }
}
```

The `dependencies` map specifies which modules to synchronize, and paths to directories where to
look for the sources.

By default `whackage` watches changes to `.js` files, and ignores changes to the sources' `node_modules`.
You can change the `include` and `exclude` glob patterns as needed. 

#### Start packager

Start the packager server with `whack run <command>`, where `command` is the npm script you normally use
to start your development server. 

If you usually start the server with `npm start`, the corresponding `whackage` command is:
```sh
whack run start
```

When started, the `whackage` server will overwrite the specified `dependencies` in your `node_modules`
with the sources you linked with `whack link`, and start a file watcher that synchronizes changes made
in the source directories into your `node_modules` as they happen. 

It will also specify a [CLI config](https://github.com/facebook/react-native/blob/master/packager/rn-cli.config.js)
which adds the `node_modules` within linked source directories to the Haste blacklist to avoid `@providesModules`
naming collisions.

### Please note

This project is in a pre-release state. The API may be considered relatively stable, but changes may still occur.

[MIT licensed](LICENSE)
