import { createStore } from "easy-peasy";

import model from "./inputs";

export default function configureAppStore() {
  return createStore(model);
}
