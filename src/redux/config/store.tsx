import { configureStore } from "@reduxjs/toolkit";

import {persistStore} from 'redux-persist'; // persist-redux 추가
// import storage from 'redux-persist/lib/storage'; // localstorage
import storage from 'redux-persist/lib/storage/session'; //sessionstorage
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userInfoReducer from "../modules/reducer/userInfoReducer"
import {userListReducer, userSearchReducer, waitingListReducer, receivingListReducer} from "../modules/reducer/userListReducer"
import {memberListReducer, memberReducer, appointmentReducer} from "../modules/reducer/memberListReducer"
import {appointmentListTypeReducer, appointmentListTypeCountReducer} from "../modules/reducer/appointmentListReducer";
import {costReducer} from "../modules/reducer/costReducer";
import {barReducer, friendVisibleReducer} from "../modules/reducer/barReducer";
import {friendListReducer} from "../modules/reducer/friendReducer"

const reducers = combineReducers({ // persist-redux 추가
  userInfo: userInfoReducer,
  userList: userListReducer,
  userSearch: userSearchReducer,
  waitingList: waitingListReducer,
  receivingList: receivingListReducer,
  memberList: memberListReducer,
  member: memberReducer,

  appointment: appointmentReducer,
  // appointmentList: appointmentListReducer,
  appoinmentListType: appointmentListTypeReducer,
  appoinmentListTypeCount: appointmentListTypeCountReducer,

  cost: costReducer,

  barState: barReducer,
  friendVisible: friendVisibleReducer,
  friendList: friendListReducer
});

const persistConfig = { // persist-redux 추가
  key: 'root',
  storage,
  // whitelist: [''], // persist를 적용하고 싶은 부분, 설정하지 않으면 모두 다 저장
  blacklist: [''] // persist를 제외하고 싶은 부분
}

const persistedReducer = persistReducer(persistConfig, reducers); // persist-redux 추가

// store 생성
export const store = configureStore({
  reducer: persistedReducer 
});

export const persistor = persistStore(store); // persist-redux 추가

export default { store, persistor }; // persist-redux 추가
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;