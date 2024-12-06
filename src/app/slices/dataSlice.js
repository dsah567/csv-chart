import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    csvData: null, 
    error: null,   
  },
  reducers: {
    setCSVData(state, action) {
      state.csvData = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.csvData = null; 
    },
  },
});

export const { setCSVData, setError } = dataSlice.actions;
export default dataSlice.reducer;
