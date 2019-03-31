import React from "react";
import { useStore } from "easy-peasy";

import Form from "./Form";

import { typeTextInRandomInput } from "./inputs";

let slicesCache;

async function infiniteBobRoss() {
  while (true) {
    await typeTextInRandomInput();
  }
}

function App() {
  const slices = useStore(state => {
    if (!slicesCache) {
      slicesCache = Object.keys(state).map(key => Number(key));
    }

    return slicesCache;
  });
  return (
    <div>
      <button onClick={infiniteBobRoss}>Type Text</button>
      <div className="row">
        {slices.map((slice, idx) => {
          return (
            <div style={{ display: "inline-block", minWidth: 70 }} key={idx}>
              <Form id={slice} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

App.displayName = "App";

export default App;
