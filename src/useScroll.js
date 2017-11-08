import React from 'react';
import ScrollBehavior from 'scroll-behavior';

import ScrollBehaviorContext from './ScrollBehaviorContext';

function defaultCreateScrollBehavior(config) {
  return new ScrollBehavior(config);
}

export default function useScroll(shouldUpdateScrollOrConfig) {
  let shouldUpdateScroll;
  let createScrollBehavior;

  if (
    !shouldUpdateScrollOrConfig ||
    typeof shouldUpdateScrollOrConfig === 'function'
  ) {
    shouldUpdateScroll = shouldUpdateScrollOrConfig;
    createScrollBehavior = defaultCreateScrollBehavior;
  } else {
    ({
      shouldUpdateScroll,
      createScrollBehavior = defaultCreateScrollBehavior,
    } = shouldUpdateScrollOrConfig);
  }

  return {
    renderRouterContext: (child, props) => (
      <ScrollBehaviorContext
        shouldUpdateScroll={shouldUpdateScroll}
        createScrollBehavior={createScrollBehavior}
        routerProps={props}
      >
        {child}
      </ScrollBehaviorContext>
    ),
  };
}
