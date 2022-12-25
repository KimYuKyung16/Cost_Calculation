import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../modules/reducer/userInfoReducer"

// store 생성
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  }
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;