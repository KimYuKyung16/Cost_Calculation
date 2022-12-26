import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../modules/reducer/userInfoReducer"
import memberListReducer from "../modules/reducer/memberListReducer"

// store 생성
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    memberList: memberListReducer
  }
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;