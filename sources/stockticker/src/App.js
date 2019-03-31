import React from "react";
import { useStore, useActions } from "easy-peasy";

import Slice from "./Slice";

let slicesCache;

function App() {
  const slices = useStore(state => {
    if (!slicesCache) {
      slicesCache = Array(Object.keys(state).length).fill(0);
    }

    return slicesCache;
  });
  const updateRandomPairInSlice = useActions(
    actions => actions.updateRandomPairInSlice
  );
  return (
    <div>
      <button onClick={updateRandomPairInSlice}>Update Random Pair</button>
      <div className="row">
        {slices.map((slice, idx) => {
          return (
            <div className="col-lg-4" key={idx}>
              <Slice idx={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

App.displayName = "App";

export default App;
