// require all `project/test/src/components/**/index.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

testsContext.keys().forEach(testsContext);

// require all `project/src/components/**/index.js`
const componentsContext = require.context('../src/', true, /\.js$/);

componentsContext.keys().forEach(componentsContext);
