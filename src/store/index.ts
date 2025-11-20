import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "@/store/slice/home/categorySlice";
import { authReducer } from "@/store/slice/auth/authSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
