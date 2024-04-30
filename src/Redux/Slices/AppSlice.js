import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle: null,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    handleToggle: (state) => {
      state.isToggle = !state.isToggle;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleToggle } = appSlice.actions;

export default appSlice.reducer;
