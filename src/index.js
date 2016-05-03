import React from 'react';

import ScrollBehaviorContainer from './ScrollBehaviorContainer';

export default function useScroll(shouldUpdateScroll) {
  return {
    renderRouterContext: (child, props) => (
      <ScrollBehaviorContainer
        shouldUpdateScroll={shouldUpdateScroll}
        routerProps={props}
      >
        {child}
      </ScrollBehaviorContainer>
    ),
  };
}
