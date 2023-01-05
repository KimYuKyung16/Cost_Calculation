import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from "./login/login";
import Signup from "./login/signup";

import Index from "./main/index";
import UserInfo from "./userInfo/userInfo";
import ModifiedUserInfo from "./userInfo/setProfile";

import ModifiedFriend from "./friend/modifyFriend";

import AddAppointment from "./calendar/addAppointment";
import Appointment from "./calendar/appointment";

import CostList from "./calendar/cost_list";
import AddCost from "./calendar/addCost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/main" element={<Index />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
        <Route path="/userinfo/modify" element={<ModifiedUserInfo />}></Route>

        <Route path="/modifiedFriend" element={<ModifiedFriend />}></Route>

        <Route path="/appointment" element={<AddAppointment />}></Route>
        <Route path="/appointment/:num" element={<Appointment />}></Route>

        <Route path="/appointment/:num/costlist" element={<CostList />}></Route>
        <Route path="/appointment/:num/cost" element={<AddCost />}></Route>
      </Routes>
    </>
  );
}

export default App;
