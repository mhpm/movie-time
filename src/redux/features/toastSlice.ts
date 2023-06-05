import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Props = {
  title: string;
  desc?: string;
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    title: "",
    desc: "",
    show: false,
  },
  reducers: {
    createToast: (state, action: PayloadAction<Props>) => {
      const { title, desc } = action.payload;

      state.title = title;
      state.desc = desc || "";
      state.show = true;
    },
    closeToast: (state) => {
      state.title = "";
      state.desc = "";
      state.show = false;
    },
  },
});

export const { createToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
