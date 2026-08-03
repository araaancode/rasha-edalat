// frontend/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';

// ساخت store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

// استخراج نوع‌ها - این خطوط کلیدی هستند
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export پیش‌فرض
export default store;