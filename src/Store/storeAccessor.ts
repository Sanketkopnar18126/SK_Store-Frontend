import type { AppDispatch, RootState } from "./index";

let store: {
  dispatch: AppDispatch;
  getState: () => RootState;
};

export const setStore = (s: typeof store) => {
  store = s;
};

export const getStore = () => store;
