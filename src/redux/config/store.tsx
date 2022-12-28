import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../modules/reducer/userInfoReducer"
import memberListReducer from "../modules/reducer/memberListReducer"
import {memberReducer} from "../modules/reducer/memberListReducer"
import signupReducer from "../modules/reducer/signUpReducer"

// store 생성
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    signupInfo: signupReducer,
    memberList: memberListReducer,
    member: memberReducer
  }
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;