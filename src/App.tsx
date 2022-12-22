import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from "./login/login";
import Index from "./main/index";
import UserInfo from "./userInfo/userInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<Index />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
