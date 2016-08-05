import { Component, PropTypes } from 'react';
import ScrollBehavior from 'scroll-behavior/lib/ScrollBehavior';

export default class ScrollBehaviorContainer extends Component {
  static propTypes = {
    shouldUpdateScroll: PropTypes.func,
    routerProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    scrollBehavior: PropTypes.instanceOf(ScrollBehavior),
  };

  constructor() {
    super();

    this.state = {
      scrollBehavior: null,
    };
  }

  getChildContext() {
    return {
      scrollBehavior: this.scrollBehavior,
    };
  }

  componentWillMount() {
    const { routerProps } = this.props;

    this.scrollBehavior = new ScrollBehavior(
      routerProps.router,
      () => this.props.routerProps.location
    );

    // Set state so child context will be updated
    this.setState({ scrollBehavior: this.scrollBehavior });

    this.onUpdate(null, routerProps);
  }

  componentDidUpdate(prevProps) {
    const { routerProps } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.onUpdate(prevRouterProps, routerProps);
  }

  componentWillUnmount() {
    this.scrollBehavior.stop();
  }

  onUpdate(prevRouterProps, routerProps) {
    const { shouldUpdateScroll } = this.props;

    this.scrollBehavior.getContainerKeys().forEach(containerKey => {
      let scrollPosition;
      if (!shouldUpdateScroll) {
        scrollPosition = true;
      } else {
        scrollPosition = shouldUpdateScroll.call(
          this.scrollBehavior, prevRouterProps, routerProps, containerKey
        );
      }

      this.scrollBehavior.updateScroll(containerKey, scrollPosition);
    });
  }

  render() {
    return this.props.children;
  }
}
