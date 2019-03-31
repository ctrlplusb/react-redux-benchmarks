import React from "react";
import { useStore } from "easy-peasy";

import Pair from "./Pair";

function Slice({ idx }) {
  const slice = useStore(state => state[idx], [idx]);
  return (
    <ul className="list-group">
      {slice.map(pair => {
        return <Pair key={pair.id} sliceId={idx} pairId={pair.id} />;
      })}
    </ul>
  );
}

Slice.displayName = "Slice";

export default Slice;
