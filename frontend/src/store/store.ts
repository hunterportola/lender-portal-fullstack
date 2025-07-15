// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loanFormReducer from './loanFormSlice';

export const store = configureStore({
  reducer: {
    loanForm: loanFormReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;