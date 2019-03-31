import React from "react";
import { useStore, useActions } from "easy-peasy";

import Slice from "./Slice";
import * as c from "./constants";

let slicesCache;

function App() {
  const slices = useStore(state => {
    if (!slicesCache) {
      slicesCache = Object.keys(state).map(key => Number(key));
      slicesCache.sort();
    }

    return slicesCache;
  });
  const incrementRandomCounter = useActions(a => a.incrementRandomCounter);
  return (
    <div>
      <button onClick={incrementRandomCounter}>Update Random Counter</button>
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
