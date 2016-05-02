# react-router-scroll [![npm][npm-badge]][npm]

React Router scroll management.

## Usage

```js
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import createUseScroll from 'react-router-scroll';

/* ... */

const { history, useScroll } = createUseScroll(browserHistory);

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useScroll)}
  />,
  container
);
```

## Guide

### Installation

```shell
$ npm i -S react react-dom react-router
$ npm i -S react-router-scroll
```

### Basic usage

Call `createUseScroll` with your history object. This will return another object with `history` and `useScroll` properties. Pass the returned `history` object into `<Router>` (or further extend it as needed), and use the returned `useScroll` object with `applyRouterMiddleware`.

### Custom scroll behavior

You can provide a custom `shouldUpdateScroll` callback to `createUseScroll`. This callback is called with both the previous and the current router props.

You can return:

- a falsy value to suppress the scroll update
- a position array such as `[0, 100]` to scroll to that position
- a truthy value to get normal scroll behavior

```js
createUseScroll(history, ({ location: prevLocation }, { location }) => (
  location.pathname !== prevLocation.pathname
));

createUseScroll(history, prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
});
```

If you are using scroll-behavior directly, you can also pass in a separate scroll behavior history extender instead of the default `withStandardScroll` to `createUseScroll`, with or without a `shouldUpdateScroll` callback as desired.

```js
createUseScroll(history, null, withScrollToTop);
createUseScroll(history, shouldUpdateScroll, withScrollToTop);
```

[npm-badge]: https://img.shields.io/npm/v/react-router-scroll.svg
[npm]: https://www.npmjs.org/package/react-router-scroll
