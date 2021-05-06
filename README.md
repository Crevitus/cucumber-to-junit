Convert Cucumber.js json results to Junit.

Installation
------------

To install the latest version, run:

    npm install cucumber-to-junit --save

Usage
-----

```typescript
import { CucumberConverter } from 'cucumber-to-junit';

const converter = new CucumberConverter({
  markPendingAsFailed: true // pending scenario steps will fail the test case
});

converter.convertToJunit( 'path/to/cucumber.json', 'path/to/output.xml');

```

## Commands

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

License
-------

[MIT](LICENSE)

Changelog
---------

### 0.1.0
- Initial release
