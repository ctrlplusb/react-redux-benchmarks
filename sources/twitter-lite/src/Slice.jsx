import React from "react";
import { useStore } from "easy-peasy";

import TwitterLite from "./TwitterLite";

function Slice({ idx }) {
  const slice = useStore(state => state[idx]);
  return (
    <ul className="list-group">
      {slice.map(tweet => {
        return <TwitterLite sliceId={idx} tweet={tweet} />;
      })}
    </ul>
  );
}

export default Slice;
