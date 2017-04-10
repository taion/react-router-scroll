import React from 'react';
import ScrollBehavior from 'scroll-behavior';

import StateStorage from './StateStorage';

const propTypes = {
  shouldUpdateScroll: React.PropTypes.func,
  updateScroll: React.PropTypes.func,
  routerProps: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};

const childContextTypes = {
  scrollBehavior: React.PropTypes.object.isRequired,
};

class ScrollBehaviorContext extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { routerProps } = props;
    const { router, location } = routerProps;

    this.location = location;

    this.scrollBehavior = new ScrollBehavior({
      addTransitionHook: router.listenBefore,
      stateStorage: new StateStorage(router),
      getCurrentLocation: () => this.location,
      shouldUpdateScroll: this.shouldUpdateScroll,
    });

    this.scrollBehavior.updateScroll(null, routerProps);
  }

  getChildContext() {
    return {
      scrollBehavior: this,
    };
  }

  componentDidUpdate(prevProps) {
    const { routerProps, updateScroll } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    updateScroll(() => {
      this.location = routerProps.location;
      this.scrollBehavior.updateScroll(prevRouterProps, routerProps);
    });
  }

  componentWillUnmount() {
    this.scrollBehavior.stop();
  }

  shouldUpdateScroll = (prevRouterProps, routerProps) => {
    const { shouldUpdateScroll } = this.props;
    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow accessing scrollBehavior._stateStorage.
    return shouldUpdateScroll.call(
      this.scrollBehavior, prevRouterProps, routerProps,
    );
  };

  registerElement = (key, element, shouldUpdateScroll) => {
    this.scrollBehavior.registerElement(
      key, element, shouldUpdateScroll, this.props.routerProps,
    );
  };

  unregisterElement = (key) => {
    this.scrollBehavior.unregisterElement(key);
  };

  render() {
    return this.props.children;
  }
}

ScrollBehaviorContext.propTypes = propTypes;
ScrollBehaviorContext.childContextTypes = childContextTypes;

export default ScrollBehaviorContext;
