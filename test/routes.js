import React from 'react';
import { IndexRoute, Route } from 'react-router';

function Page1() {
  return (
    <div style={{ width: 20000, height: 20000 }} />
  );
}

function Page2() {
  return (
    <div style={{ width: 10000, height: 10000 }} />
  );
}

export const syncRoutes = [
  <Route path="/" component={Page1} />,
  <Route path="/page2" component={Page2} />,
];

function asyncOnEnter(nextState, cb) {
  setTimeout(cb, 100);
}

export const asyncRoutes = [
  <Route path="/" onEnter={asyncOnEnter} component={Page1} />,
  <Route path="/page2" onEnter={asyncOnEnter} component={Page2} />,
];

export function createElementRoutes(Page) {
  return (
    <Route path="/" component={Page}>
      <IndexRoute />
      <Route path="other" />
    </Route>
  );
}
