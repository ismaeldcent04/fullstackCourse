import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});
export const { setLoggedUser } = loginSlice.actions;
export default loginSlice.reducer;
