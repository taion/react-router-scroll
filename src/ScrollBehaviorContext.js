import React from 'react';
import PropTypes from 'prop-types';
import ScrollBehavior from 'scroll-behavior';

import StateStorage from './StateStorage';

const propTypes = {
  shouldUpdateScroll: PropTypes.func,
  routerProps: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const childContextTypes = {
  scrollBehavior: PropTypes.object.isRequired,
};

class ScrollBehaviorContext extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { routerProps } = props;
    const { router } = routerProps;

    this.scrollBehavior = new ScrollBehavior({
      addTransitionHook: router.listenBefore,
      stateStorage: new StateStorage(router),
      getCurrentLocation: () => this.props.routerProps.location,
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
    const { routerProps } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.scrollBehavior.updateScroll(prevRouterProps, routerProps);
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
