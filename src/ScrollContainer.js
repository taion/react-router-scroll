import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ScrollBehavior from 'scroll-behavior/lib/ScrollBehavior';

export default class ScrollContainer extends Component {
  static propTypes = {
    scrollKey: PropTypes.string,
    children: PropTypes.element,
  };

  static contextTypes = {
    scrollBehavior: PropTypes.instanceOf(ScrollBehavior),
  };

  componentDidMount() {
    const node = findDOMNode(this);
    this.context.scrollBehavior.registerContainer(this.props.scrollKey, node);
  }

  componentWillUnmount() {
    this.context.scrollBehavior.unregisterContainer(this.props.scrollKey);
  }

  render() {
    return this.props.children;
  }
}
