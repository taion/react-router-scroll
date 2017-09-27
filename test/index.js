import 'babel-polyfill';

import createReactClass from 'create-react-class';
import dirtyChai from 'dirty-chai';
import PropTypes from 'prop-types';
import React from 'react';

global.chai.use(dirtyChai);

// FIXME: Tests fail with React Router v3, but React Router v2 doesn't work
// with React v16. This hacks around that incompatibility.
React.createClass = createReactClass;
React.PropTypes = PropTypes;

const testsContext = require.context('.', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
