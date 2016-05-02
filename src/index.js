import React from 'react';
import ReactDOM from 'react-dom';
import withStandardScroll from 'scroll-behavior/lib/withStandardScroll';

import LocationUpdateListener from './LocationUpdateListener';

export default function createUseScroll(
  history,
  shouldUpdateScroll,
  withScroll = withStandardScroll
) {
  let updateScroll = null;
  let deferredOnUpdate = null;

  function onUpdate(prevRouterProps, routerProps) {
    if (updateScroll == null) {
      deferredOnUpdate = () => {
        onUpdate.call(this, prevRouterProps, routerProps);
      };
      return;
    }

    // Force reflow.
    /* eslint-disable no-unused-expressions */
    ReactDOM.findDOMNode(this).offsetHeight;
    /* eslint-enable no-unused-expressions */

    let scrollPosition;
    if (!shouldUpdateScroll) {
      scrollPosition = true;
    } else {
      scrollPosition = shouldUpdateScroll(prevRouterProps, routerProps);
    }

    updateScroll(scrollPosition);
    updateScroll = null;
  }

  return {
    history: withScroll(history, (prevLocation, location, cb) => {
      updateScroll = cb;

      if (deferredOnUpdate) {
        deferredOnUpdate();
      }
    }),
    useScroll: {
      renderRouterContext: (child, props) => (
        <LocationUpdateListener
          routerProps={props}
          onUpdate={onUpdate}
        >
          {child}
        </LocationUpdateListener>
      ),
    },
  };
}
