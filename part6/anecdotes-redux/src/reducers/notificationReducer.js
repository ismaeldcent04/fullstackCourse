import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
  },
});
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, time);
  };
};
export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
