import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter, getState } = filterSlice.actions;
export default filterSlice.reducer;
