import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
    backgroundColor: "#f8f9fa",
    textColor: "black",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (state.isDarkMode) {
        state.backgroundColor = "#343a40";
        state.textColor = "white";
      } else {
        state.backgroundColor = "#f8f9fa";
        state.textColor = "black";
      }
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
