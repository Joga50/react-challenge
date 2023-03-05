import { configureStore, combineReducers } from "@reduxjs/toolkit";

import themeReducer from "./features/themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
