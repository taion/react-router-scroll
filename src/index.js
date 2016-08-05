import React from 'react';

import ScrollBehaviorContainer from './ScrollBehaviorContainer';
import ScrollContainer from './ScrollContainer';

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

export { ScrollContainer };
