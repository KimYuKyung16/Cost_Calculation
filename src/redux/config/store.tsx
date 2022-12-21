import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../modules/reducer/userInfoReducer"
// import { combineReducers } from "redux";

// combineReducers: 여러 reducer들을 하나의 store로 저장 가능하게 해줌.
// const rootReducer = combineReducers({
//   // counter: counter,
// });

// store 생성
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  }
});

export default store;