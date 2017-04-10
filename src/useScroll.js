import React from 'react';

import ScrollBehaviorContext from './ScrollBehaviorContext';

export default function useScroll(options = {}) {
  // Support the old configuration format where
  // shouldUpdateScroll is the only argument
  const shouldUpdateScroll = typeof options === 'function' ?
    options :
    options.shouldUpdateScroll;

  const updateScroll = options.updateScroll || (cb => cb());

  return {
    renderRouterContext: (child, props) => (
      <ScrollBehaviorContext
        shouldUpdateScroll={shouldUpdateScroll}
        updateScroll={updateScroll}
        routerProps={props}
      >
        {child}
      </ScrollBehaviorContext>
    ),
  };
}
