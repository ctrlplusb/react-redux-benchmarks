import { action, thunk } from "easy-peasy";
import * as c from "./constants";

const model = {
  initialize: action((state, payload) => {
    const { numberOfCounters } = payload;
    for (let i = 0; i < numberOfCounters; i++) {
      state[i] = 0;
    }
  }),
  increment: action((state, payload) => {
    const { counterId } = payload;
    const value = state[counterId] || 0;
    state[counterId] = value + 1;
  }),
  incrementMany: action((state, payload) => {
    const { mod } = payload;
    for (let counterId = 0; counterId < c.NUMBER_OF_SLICES; counterId++) {
      if (counterId % mod === 0) {
        const value = state[counterId] || 0;
        state[counterId] = value + 1;
      }
    }
  }),
  incrementRandomCounter: thunk(actions => {
    const counterId = Math.floor(Math.random() * c.NUMBER_OF_SLICES);
    return actions.increment({ counterId });
  })
};

export default model;
