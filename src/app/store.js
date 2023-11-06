import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/images/imageSlice";
import selectedImageReducer from "../features/selectedImages/selectedImagesSlice";
export const store = configureStore({
  reducer: {
    images: imageReducer,
    selectedImages: selectedImageReducer,
  },
});
