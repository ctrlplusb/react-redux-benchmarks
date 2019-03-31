import { action } from "redux-starter-kit";
import * as c from "./constants";

import { TEXT_INPUT_MOD, TREE_DEPTH } from "./constants";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let nextCharCounter = 0;

export function createStringId(sliceId, depth) {
  const stringId = `${sliceId}-${depth}`;
  return stringId;
}

function getNextCharacter() {
  const charIndex = nextCharCounter % CHARACTERS.length;
  nextCharCounter++;
  const character = CHARACTERS.charAt(charIndex);
  return character;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const model = {
  initialize: action((state, payload) => {
    const { stringId } = payload;
    state[stringId] = "a";
  }),
  append: action((state, payload) => {
    const { stringId, character } = payload;

    if (state[stringId]) {
      state[stringId] += character;
    }
    //const value = state[counterId] || 0;
    //state[counterId] = value + 1;
  }),
  appendMany: action((state, payload) => {
    const { mod, character } = payload;
    const keys = Object.keys(state);

    keys.forEach((stringId, index) => {
      if (index % mod === 0) {
        state[stringId] += character;
      }
    });
    for (let counterId = 0; counterId < c.NUMBER_OF_SLICES; counterId++) {
      if (counterId % mod === 0) {
        const value = state[counterId] || 0;
        state[counterId] = value + 1;
      }
    }
  }),
  appendRandomCharacter: thunk(actions => {
    const sliceId = getRandomInt(0, c.NUMBER_OF_SLICES);
    const maxTextsPerSlice = Math.floor(TREE_DEPTH / TEXT_INPUT_MOD);
    const selectedTextId = getRandomInt(1, maxTextsPerSlice);

    const character = getNextCharacter();

    const stringId = createStringId(sliceId, selectedTextId);

    return actions.append({ stringId, character });
  }),
  appendRandomCharToMany: thunk((actions, mod) => {
    const character = getNextCharacter();

    return actions.appendMany({ mod, character });
  })
};

export default model;
