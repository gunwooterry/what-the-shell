import * as React from 'react';
import { Icon } from 'semantic-ui-react';

interface ArrowsProps {
  isGuiSelected: boolean;
  modeHandler: () => void;
}

interface ArrowsStates {
  hover: boolean;
}

const sizes = {
  big: 4,
  small: 1,
  bigHover: 3.5,
  smallHover: 2,
};

class Arrows extends React.Component<ArrowsProps, ArrowsStates> {
  constructor(props: ArrowsProps) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({
      hover: true,
    });
  }

  onMouseOut() {
    this.setState({
      hover: false,
    });
  }

  getArrowSizes() {
    const big = this.state.hover ? sizes.bigHover : sizes.big;
    const small = this.state.hover ? sizes.smallHover : sizes.small;
    return this.props.isGuiSelected ?
      { right: big, left: small } :
      { right: small, left: big };
  }

  render() {
    const arrowSizes = this.getArrowSizes();
    return (
      <div
        onClick={this.props.modeHandler}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={{ textAlign: 'center' }}
      >
        <Icon name="arrow right" size="huge" style={{ fontSize: `${arrowSizes.right}em` }}/>
        <Icon name="arrow left" size="huge" style={{ fontSize: `${arrowSizes.left}em` }}/>
      </div>
    );
  }
}

export default Arrows;
