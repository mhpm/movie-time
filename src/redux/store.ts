import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "@/redux/features/movieSlice";
import toastReducer from "@/redux/features/toastSlice";

export const store = configureStore({
  reducer: {
    videoReducer,
    toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
