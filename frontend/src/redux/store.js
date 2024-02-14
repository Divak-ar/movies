import { configureStore } from "@reduxjs/toolkit";
import { setupListener } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {},
});

setupListener(store.dispatch);
export default store;
