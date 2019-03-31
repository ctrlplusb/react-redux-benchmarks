import { createStore } from "easy-peasy";

import model from "./pairsReducer";

export default function configureStore(preloadedState) {
  return createStore(model, { initialState: preloadedState });
}
