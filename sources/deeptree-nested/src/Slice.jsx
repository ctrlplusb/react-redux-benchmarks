import React, { Component, useEffect } from "react";
import { useStore } from "easy-peasy";

// import { initialize, createStringId } from "./strings";
import { TEXT_INPUT_MOD } from "./constants";

const Counter = ({ idx }) => {
  const value = useStore(state => state.counters[idx], [idx]);
  return <div>Value: {value}</div>;
};

Counter.displayName = "Counter";

function TextDisplay({ children, idx, inputId }) {
  const { stringId, text } = useStore(state => {
    const stringId = createStringId(idx, inputId); //`${ownProps.idx}-${ownProps.remainingDepth}`;
    const text = state.strings[stringId] || "unknown";
    return { text, stringId };
  });
  const { initialize, createStringId } = useActions(actions => actions.string);
  useEffect(() => {
    initialize(stringId);
  }, []);
  return (
    <div>
      Text {stringId}:<br />
      <textarea value={text} />
      {children}
    </div>
  );
}
TextDisplay.displayName = "TextDisplay";

class Slice extends Component {
  state = {};

  componentDidMount = () => {
    //this.props.fillPairs(this.props.idx);
  };

  render() {
    const { remainingDepth, idx } = this.props;

    if (remainingDepth > 0) {
      let renderedChild = (
        <div>
          {idx}.{remainingDepth}
          <div>
            <Slice idx={idx} remainingDepth={remainingDepth - 1} />
          </div>
        </div>
      );

      if (remainingDepth % TEXT_INPUT_MOD === 0) {
        renderedChild = (
          <TextDisplay idx={idx} inputId={remainingDepth / TEXT_INPUT_MOD}>
            {renderedChild}
          </TextDisplay>
        );
      }

      return renderedChild;
    }

    return <Counter idx={idx} />;
  }
}
Slice.displayName = "Slice";

export default Slice;
//export default connect(mapStateToProps, actions)(Slice);
