import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImages: [],
};

const selectedImagesSlice = createSlice({
  name: "selectedImages",
  initialState,
  reducers: {
    add: (state, action) => {
      state.selectedImages.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.selectedImages.indexOf(action.payload);
      state.selectedImages.splice(index, 1);
    },
    clear: (state) => {
      state.selectedImages = [];
    },
  },
});
export const { add, remove, clear } = selectedImagesSlice.actions;
export default selectedImagesSlice.reducer;
