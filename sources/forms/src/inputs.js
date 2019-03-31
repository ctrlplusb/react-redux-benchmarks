import { action } from "easy-peasy";
import * as c from "./constants";
import userEvent from "user-event";

const model = {
  initialize: action((state, payload) => {
    const { numberOfInputs } = payload;
    for (let i = 0; i < numberOfInputs; i++) {
      state[i] = "";
    }
  }),
  updateInput: action((state, payload) => {
    const { inputId, text } = payload;
    state[inputId] = text;
  })
};

const BOB_ROSS_IPSUM = `
Little short strokes. And I know you're saying, 'Oh Bob, you've done it this
time.' And you may be right. You can do anything here. So don't worry about it.
Even the worst thing we can do here is good. Absolutely no pressure. You are
just a whisper floating across a mountain. Isn't that fantastic that you can
create an almighty tree that fast?
`.trim();

export function typeTextInRandomInput() {
  const inputId = Math.floor(Math.random() * c.NUMBER_OF_INPUTS);

  const input = document.getElementById(`input-${inputId}`);

  return userEvent.type(input, BOB_ROSS_IPSUM, { delay: 25 });
}

export default model;
