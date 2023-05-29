import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    video: null,
  },
  reducers: {
    setVideo: (state, action: PayloadAction<any>) => {
      state.video = action.payload;
    },
    clearVideo: (state) => {
      state.video = null;
    },
  },
});

export const { setVideo, clearVideo } = videoSlice.actions;

export default videoSlice.reducer;
