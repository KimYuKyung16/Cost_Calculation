import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from "./login/login";
import Signup from "./login/signup";

import Index from "./main/index";
import UserInfo from "./userInfo/userInfo";

import ModifiedFriend from "./friend/modifyFriend";

import Appointment from "./calendar/addAppointment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/main" element={<Index />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>

        <Route path="/modifiedFriend" element={<ModifiedFriend />}></Route>

        <Route path="/appointment" element={<Appointment />}></Route>
      </Routes>
    </>
  );
}

export default App;
