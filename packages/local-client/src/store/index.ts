import { configureStore } from "@reduxjs/toolkit";
import cellReducer from "./slices/cellSlice";
import bundleReducer from "./slices/bundleSlice";

const store = configureStore({
  reducer: {
    cell: cellReducer,
    bundle: bundleReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from "./slices/cellSlice";
export * from "./slices/bundleSlice";
