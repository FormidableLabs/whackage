[![Maintenance Status][maintenance-image]](#maintenance-status)


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

**`whackage` provides a hot-reload-friendly workflow for developing across multiple React Native packages**

React Native packager, the development server that bundles your app's JavaScript sources, has a few rough
edges when it comes to developing apps and libraries that span across multiple repositories. It doesn't
[handle symlinks](https://productpains.com/post/react-native/symlink-support-for-packager) reliably, and the
[Haste module system](https://github.com/facebookarchive/node-haste/tree/master) gets easily confused by
`@providesModule` declarations in subdependencies.

Whackage is an `npm link` replacement that works with React Native. It synchronizes changes in your local workspace to your project's `node_modules` without using symlinks, and automatically generates a packager blacklist for linked modules to avoid Haste naming collisions.

We wrote whackage to scratch our own itch when working on [Victory Native](https://github.com/formidablelabs/victory-native). It's a blunt instrument, but it works well. Hope you find it useful!

### How-to

#### Quick start

```sh
# install whackage globally
npm i -g whackage

# rest of the steps happen in your project root directory
cd ~/your-project-directory

# create new whackage.json
whack init

# create a link to a package you want to make changes to
whack link ../path/to/other/package

# start react native packager and the whackage server (equivalent to npm start)
whack run start
```

More detailed instructions of each step below:

#### Prerequisites
* node `>=4`
* npm `>=3`
* OSX/Linux. Windows currently not supported, but PRs welcome.
* `rsync` (most likely pre-installed on your system)

#### Install

Install `whackage` globally: 
```sh
npm i -g whackage
```

#### Initialize whackage in your project
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

You'll now have a `whackage.json` file that looks as follows:
```json
{
  "include": "/**/*.js",
  "exclude": ["/node_modules/*", ".babelrc", ".git"],
  "dependencies": {
    "victory-chart-native": "../victory-chart-native",
    "victory-core-native": "../victory-core-native"
  }
}
```

The `dependencies` map specifies which modules to synchronize, and paths to directories where to
look for the sources.

By default whackage watches changes to `.js` files, and ignores your sources' `node_modules` and git metadata. We also skip copying Babel configurations, because the React Native packager does not support per-module configurations, and project-specific presets [often causes the Babel transpilation step to fail](https://github.com/facebook/react-native/issues/10882).

You can configure the `include` and `exclude` glob patterns as needed.

#### Start packager

Start the packager server with `whack run <command>`, where `command` is the npm script you normally use
to start your development server.

If you usually start the server with `npm start`, the corresponding `whackage` command is:
```sh
whack run start
```

(Alternatively, if your start task is `npm run server:dev`, you'd use `whack run server:dev`!)

When started, the `whackage` server will overwrite the specified `dependencies` in your `node_modules`
with the sources you linked with `whack link`, and start a file watcher that synchronizes changes made
in the source directories into your `node_modules` as they happen.

It will also specify a [CLI config](https://github.com/facebook/react-native/blob/master/packager/rn-cli.config.js)
which adds the `node_modules` within linked source directories to the Haste blacklist to avoid `@providesModules`
naming collisions.

#### Update transitive dependencies

When you `whack link` a package, whackage automatically installs and flattens transitive dependencies into your project. If you change the dependencies of your linked packages, you'll need to run `whack install` to add them to your project:
```sh
whack install victory-chart-native
```

Or sync all transitive dependencies or all linked packages:
```sh
whack install
```

#### Stop whacking

When you're done making changes to your local packages, you can remove the `whackage.json` entry and reset the module to its original state:
```
whack unlink victory-chart-native
```

To reset your your original dependencies, but keep the `whackage.json` around for the next time you want to work with that package, simply nuke your `node_modules`:
```
rm -rf node_modules && npm i
```

#### API

Run `whack --help` for a list of all available commands and options.

### Misc

#### Why the name?

It's wacky, it's hacky, and it rhymes with package. Also it whacks your `node_modules`.

#### Contributing 

Found an issue or a missing feature? Congratulations! :tada: That is the prize you win as an early adopter! GitHub issues and pull requests are more than welcome.

#### Please note

This project is in a pre-release state. The API may be considered relatively stable, but changes may still occur.

[MIT licensed](LICENSE)

## Maintenance Status

 **Archived:** This project is no longer maintained by Formidable. We are no longer responding to issues or pull requests unless they relate to security concerns. We encourage interested developers to fork this project and make it their own!

 [maintenance-image]: https://img.shields.io/badge/maintenance-archived-red.svg
