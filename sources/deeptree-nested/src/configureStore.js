import { createStore } from "easy-peasy";

import countersReducer from "./counters";
import stringsReducer from "./strings";

export default function configureAppStore() {
  const store = createStore({
    counters: countersReducer,
    strings: stringsReducer
  });

  return store;
}
