import 'babel-polyfill';

import dirtyChai from 'dirty-chai';

global.chai.use(dirtyChai);

const testsContext = require.context('.', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
