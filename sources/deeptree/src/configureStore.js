import { createStore } from "easy-peasy";
import model from "./counters";

export default function configureStore(preloadedState) {
  return createStore(model, { initialState: preloadedState });
}
