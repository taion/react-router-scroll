import React from 'react';

import ScrollBehaviorContext from './ScrollBehaviorContext';

export default function useScroll(shouldUpdateScroll) {
  return {
    renderRouterContext: (child, props) => (
      <ScrollBehaviorContext
        shouldUpdateScroll={shouldUpdateScroll}
        routerProps={props}
      >
        {child}
      </ScrollBehaviorContext>
    ),
  };
}
