import React from "react";
import { useStore, useActions } from "easy-peasy";

import Slice from "./Slice";
import * as c from "./constants";

let slicesCache;

function App() {
  const slices = useStore(state => {
    if (!slicesCache) {
      slicesCache = Array.from({ length: c.NUMBER_OF_SLICES }).map(
        (dummy, idx) => idx
      );
      //slices.sort();
    }
    return { slicesCache };
  });
  const {
    incrementRandomCounter,
    incrementFifth,
    incrementThird,
    appendRandomCharacter,
    appendMany
  } = useActions(actions => ({
    incrementRandomCounter: actions.counters.incrementRandomCounter,
    incrementFifth: () => actions.counters.incrementMany(5),
    incrementThird: () => actions.counters.incrementMany(3),
    appendRandomCharacter: actions.strings.appendRandomCharacter,
    appendMany: () => actions.strings.appendRandomCharToMany(4)
  }));
  return (
    <div>
      <div>
        <button id="incrementRandom" onClick={incrementRandomCounter}>
          Update Random Counter
        </button>
        <button id="incrementFifth" onClick={incrementFifth}>
          Update 1/5 Counters
        </button>
        <button id="incrementThird" onClick={incrementThird}>
          Update 1/3 Counters
        </button>
        <button id="appendRandomCharacter" onClick={appendRandomCharacter}>
          Append Random Char
        </button>
        <button id="appendMany" onClick={appendMany}>
          Append Char to Many
        </button>
      </div>
      <div className="row">
        {slices.map((slice, idx) => {
          return (
            <div style={{ display: "inline-block", minWidth: 70 }} key={idx}>
              <Slice idx={slice} remainingDepth={c.TREE_DEPTH} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
App.displayName = "App";

export default App;
