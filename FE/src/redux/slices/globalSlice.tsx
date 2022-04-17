import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    unsetLoading: (state) => {
      state.isLoading = false;
    }
  }
});
export const { setLoading, unsetLoading } = globalSlice.actions;
export default globalSlice.reducer;
