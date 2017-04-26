# ecommerce-boilerplate

## Requirements:
- Tools: text editor like Sublime Text
- NodeJS v6.2.2
- Npm v3.10.8

## Project stup:

Once all requirements is setup, run these command to setup project depedences:

```
cd path\to\project
npm install
```

## Development

For development, the environment designed to serving end to end from testing, linting and automatically reload, all in one command:

```
npm run start
```

## Building

For build project to deploy, run this command

```
npm run build
```

## Testing

Running all test cases:

```
npm run test
```

You can also run all test cases in watch mode

```
npm run test:watch
```

## Style guide

This project follow AirBnB ES6/React style guide. If you need more information about the rules, follow the reference bellow

[AirBnB Style Guide for ES6](https://github.com/airbnb/javascript#ecmascript-6-styles)
[AirBnB Style Guide for React](https://github.com/airbnb/javascript/tree/master/react)

## Project structure explained

```
.
├── .babelrc                  # Configures Babel
├── .editorconfig             # Configures editor rules
├── .eslintrc                 # Configures ESLint
├── .gitignore                # Tells git which files to ignore
├── .istanbul.yml             # Configure istanbul code coverage
├── .npmrc                    # Configures npm to save exact by default
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── actions               # Flux/Redux actions. List of distinct actions that can occur in the app.
│   ├── components            # React components
│   ├── constants             # Application constants including constants for Redux
│   ├── containers            # Top-level React components that interact with Redux
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev. Not actually used in prod build.
│   ├── index.ejs             # Template for homepage
│   ├── index.js              # Entry point for your app
│   ├── reducers              # Redux reducers. Your state is altered here based on actions
│   ├── store                 # Redux store configuration
│   ├── styles                # CSS Styles, typically written in Sass
│   └── utils                 # Plain old JS objects (POJOs). Pure logic. No framework specific code here.
├── tools                     # Node scripts that run build related tools
│   ├── setup                 # Scripts for setting up a new project using React Slingshot
│   │   ├── setup.js          # Configure project set up
│   │   ├── setupMessage.js   # Display message when beginning set up
│   │   └── setupPrompts.js   # Configure prompts for set up
│   ├── build.js              # Runs the production build
│   ├── chalkConfig.js        # Centralized configuration for chalk (adds color to console statements)
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── nodeVersionCheck.js   # Confirm supported Node version is installed
│   ├── removeDemo.js         # Remove demo app
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
│   ├── startMessage.js       # Display message when development build starts
│   ├── testSetup.js          # Configures mocha
│   └── analyzeBundle.js      # Analyzes the webpack bundle
├── webpack.config.dev.js     # Configures webpack for development builds
└── webpack.config.prod.js    # Configures webpack for production builds
```

## React-Redux model explained
