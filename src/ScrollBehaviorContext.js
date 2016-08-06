import React from 'react';
import ScrollBehavior from 'scroll-behavior/lib/ScrollBehavior';

const propTypes = {
  shouldUpdateScroll: React.PropTypes.func,
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

    this.scrollBehavior = new ScrollBehavior(
      routerProps.router,
      () => this.props.routerProps.location,
      this.shouldUpdateScroll,
    );

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

    // Hack to allow accessing scrollBehavior.readPosition().
    return shouldUpdateScroll.call(
      this.scrollBehavior, prevRouterProps, routerProps
    );
  };

  registerElement = (key, element, shouldUpdateScroll) => {
    this.scrollBehavior.registerElement(
      key, element, shouldUpdateScroll, this.props.routerProps
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
