import React from 'react';

export default class LocationUpdateListener extends React.Component {
  static propTypes = {
    routerProps: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  componentDidMount() {
    const { routerProps, onUpdate } = this.props;

    onUpdate.call(this, undefined, routerProps);
  }

  componentDidUpdate(prevProps) {
    const { routerProps, onUpdate } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    onUpdate.call(this, prevRouterProps, routerProps);
  }

  render() {
    return this.props.children;
  }
}
