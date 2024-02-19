# First Robotics UK - Simulator

<a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly" /> </a>

[Live version available here](https://sim.morethanrobots.uk)

## Helpful Tools

### React DevTools

To help debug React code, please download this plugin for chrome: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en. The official React debugger has useful tools to view the state and props of React components and navigate the tree a lot like the HTML elements debugger.

### Redux DevTools

To help debug redux and get the most value out of it, make sure to download this tool: https://github.com/reduxjs/redux-devtools! It will help you to debug the flow of actions in the app, as well as replay them, pause them, etc.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload dynamically by HMR if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See [Vitest](https://vitest.dev/guide/) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See [Vite](https://vitejs.dev/guide/) for more information.

## NPM Configuration

For develoeprs who uses private NPM registry you can create a file in the root of this project name `.npmrc` with this content to make sure you aure using the public npm registry:

```
registry = https://registry.npmjs.org
```

Also make sure to disconnect from any proxy or vpn you are using.

## End-to-End Testing

This project is using Playwright to run end-to-end tests. This is how you can use it:

Runs the end-to-end tests:

```
npx playwright test
```

Starts the interactive UI mode:

```
npx playwright test --ui
```

Runs the tests only on Desktop Chrome:

```
npx playwright test --project=chromium
```

Runs the tests in a specific file:

```
npx playwright test example
```

Runs the tests in debug mode:

```
npx playwright test --debug
```

Auto generate tests with Codegen:

```
npx playwright codegen
```

## Semantic Release

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) to manage github releases and changelogs.
When changes merged to `main` branch, GitHub Actions will trigger a release workflow that will create a new release. It would be useful to follow the commit message convention to make sure the release is done correctly. Although this is not a strict requirement.

The current commit message convention is based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Those rules are customizable in the `.releaserc.json` file. [Guidelines](https://github.com/semantic-release/commit-analyzer?tab=readme-ov-file#release-rules)
