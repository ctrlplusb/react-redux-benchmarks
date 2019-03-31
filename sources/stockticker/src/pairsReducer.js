import { action, thunk } from "easy-peasy";
import Chance from "chance";
import * as c from "./constants";

const chance = new Chance();

const model = Array(c.NUMBER_OF_SLICES)
  .fill(0)
  .reduce((acc, cur, i) => {
    acc[i] = [];
    return acc;
  }, {});

function createPairs() {
  const pairs = [];
  const entries = Math.floor(c.NUM_ENTRIES / c.NUMBER_OF_SLICES);
  for (let i = 0; i < entries; i++) {
    const pair = chance.currency_pair();
    pairs.push({
      id: i,
      value: Math.random(),
      name: pair[0].code + pair[1].code
    });
  }
  return pairs;
}

model.fillPairs = action((state, payload) => {
  const { sliceId } = payload;
  state[sliceId] = createPairs();
});

model.updatePair = action((state, payload) => {
  const { sliceId, pairId } = payload;
  state[sliceId].forEach(pair => {
    if (pair.id === pairId) {
      pair.value = Math.random();
    }
  });
});

model.updateRandomPairInSlice = thunk(actions => {
  const pairId = Math.floor(
    Math.random() * (c.NUM_ENTRIES / c.NUMBER_OF_SLICES)
  );
  const sliceId = Math.floor(Math.random() * c.NUMBER_OF_SLICES);
  actions.updatePair({ sliceId, pairId });
});

export default model;
