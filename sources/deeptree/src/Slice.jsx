import React, { Component } from "react";
import { useStore } from "easy-peasy";

const Counter = ({ idx }) => {
  const value = useStore(state => state[idx], [idx]);
  return <div>Value: {value}</div>;
};

class Slice extends Component {
  state = {};

  componentDidMount = () => {
    //this.props.fillPairs(this.props.idx);
  };

  render() {
    const { remainingDepth, idx } = this.props;

    if (remainingDepth > 0) {
      return (
        <div>
          {idx}.{remainingDepth}
          <div>
            <Slice idx={idx} remainingDepth={remainingDepth - 1} />
          </div>
        </div>
      );
    }

    return <Counter idx={idx} />;
  }
}
Slice.displayName = "Slice";

export default Slice;
//export default connect(mapStateToProps, actions)(Slice);
