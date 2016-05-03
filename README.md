# react-router-scroll [![npm][npm-badge]][npm]

[React Router](https://github.com/reactjs/react-router) scroll management.

## Usage

```js
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import useScroll from 'react-router-scroll';

/* ... */

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useScroll())}
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

Apply the `useScroll` router middleware, as in the example above.

### Custom scroll behavior

You can provide a custom `shouldUpdateScroll` callback to `useScroll`. This callback is called with both the previous and the current router props.

You can return:

- a falsy value to suppress the scroll update
- a position array such as `[0, 100]` to scroll to that position
- a truthy value to get normal scroll behavior

```js
useScroll(({ location: prevLocation }, { location }) => (
  location.pathname !== prevLocation.pathname
));

useScroll((prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
});
```

[npm-badge]: https://img.shields.io/npm/v/react-router-scroll.svg
[npm]: https://www.npmjs.org/package/react-router-scroll
