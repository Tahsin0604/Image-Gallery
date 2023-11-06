import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isError: false,
  error: "",
  images: [],
};
export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const response = await fetch("/imageList.json");
  const images = await response.json();
  return images;
});

const imageSlices = createSlice({
  name: "images",
  initialState,
  reducers: {
    deleteImages: (state, action) => {
      state.images = state.images.filter(
        (image) => !action.payload.includes(image.id)
      );
    },
    updatedOrder: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.images = [];
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.message;
        state.images = [];
      });
  },
});
export const { deleteImages, updatedOrder } = imageSlices.actions;
export default imageSlices.reducer;
