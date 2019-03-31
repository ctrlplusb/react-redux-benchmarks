import React, { unstable_Profiler as Profiler } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "fps-emit";
import { action, createStore, StoreProvider } from "easy-peasy";
import App from "./App";

import * as c from "./constants";

const model = Array(c.NUMBER_OF_SLICES)
  .fill(0)
  .reduce((acc, curr, i) => {
    acc[i] = [];
    return acc;
  }, {});

model.addTweet = action((state, { sliceId, tweet }) => {
  state[sliceId].push(tweet);
});

const store = createStore(model);

const renderResults = [];
window.renderResults = renderResults;

function onAppRendered(
  id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime,
  interactions = []
) {
  if (!Array.isArray(interactions)) {
    interactions = [...interactions];
  }
  renderResults.push({
    id,
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime,
    interactions
  });
}

ReactDOM.render(
  <Profiler id="appProfiler" onRender={onAppRendered}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </Profiler>,
  document.getElementById("root")
);

function addTweetInRandomSlice() {
  const sliceId = Math.floor(Math.random() * c.NUMBER_OF_SLICES);
  store.dispatch.addTweet({ sliceId, tweet: "fabulous" });
}

setInterval(addTweetInRandomSlice, 13);

setInterval(addTweetInRandomSlice, 21);

setInterval(addTweetInRandomSlice, 34);

setInterval(addTweetInRandomSlice, 55);
