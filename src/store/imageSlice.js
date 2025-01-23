import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panelImages: [], // Array to store the actual file objects
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.panelImages.push(action.payload); // Store the actual file object
    },
    removeImage: (state, action) => {
      state.panelImages = state.panelImages.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { addImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;
