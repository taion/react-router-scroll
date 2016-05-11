import React from 'react';
import ScrollBehavior from 'scroll-behavior/lib/ScrollBehavior';

export default class ScrollBehaviorContainer extends React.Component {
  static propTypes = {
    shouldUpdateScroll: React.PropTypes.func,
    routerProps: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  componentDidMount() {
    const { routerProps } = this.props;

    this.scrollBehavior = new ScrollBehavior(
      routerProps.router,
      () => this.props.routerProps.location
    );

    this.onUpdate(null, routerProps);
  }

  componentDidUpdate(prevProps) {
    const { routerProps } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location || (routerProps.location.hash !== prevRouterProps.location.hash && routerProps.location.pathname === prevRouterProps.location.pathname)) {
      return;
    }

    this.onUpdate(prevRouterProps, routerProps);
  }

  componentWillUnmount() {
    this.scrollBehavior.stop();
  }

  onUpdate(prevRouterProps, routerProps) {
    const { shouldUpdateScroll } = this.props;

    let scrollPosition;
    if (!shouldUpdateScroll) {
      scrollPosition = true;
    } else {
      scrollPosition = shouldUpdateScroll.call(
        this.scrollBehavior, prevRouterProps, routerProps
      );
    }

    this.scrollBehavior.updateScroll(scrollPosition);
  }

  render() {
    return this.props.children;
  }
}
