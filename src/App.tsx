import GlobalStyle from "../src/styles/GlobalStyle";

import { Routes, Route } from 'react-router-dom';

import Index from "./components/start/index"; // 시작 페이지

import Login from "./components/auth/login"; // 로그인 페이지
import Signup from "./components/auth/signup"; // 회원가입 페이지

import Main from "./components/main/index"; // 메인 페이지
import UserInfo from "./components/userInfo/userInfo";
import ModifiedUserInfo from "./components/userInfo/setProfile";

import ModifiedFriend from "./components/friend/modifyFriend";
import Friend from "./components/friend/friend";

import AddAppointment from "./pages/addAppointment";
import Appointment from "./components/appointment/index"; // 일정 상세 페이지
// import AppointmentMemberList from "./calendar/appointment_MembrList";

import CostList from "./components/appointment/costList";
import AddCost from "./components/appointment/costList/addCost";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Index />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/main" element={<Main />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
        <Route path="/userinfo/modify" element={<ModifiedUserInfo />}></Route>

        <Route path="/modifiedFriend" element={<ModifiedFriend />}></Route>
        <Route path="/friend" element={<Friend />}></Route>

        <Route path="/appointment" element={<AddAppointment />}></Route>
        <Route path="/appointment/:num" element={<Appointment />}></Route>

        {/* <Route path="/appointment/:num/memberlist" element={<AppointmentMemberList num={undefined} />}></Route> */}
        <Route path="/appointment/:num/costlist" element={<CostList num={undefined} />}></Route>
        <Route path="/appointment/:num/cost" element={<AddCost />}></Route>
      </Routes>
    </>
  );
}

export default App;
