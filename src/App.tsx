import GlobalStyle from "../src/styles/GlobalStyle";

import { Routes, Route } from 'react-router-dom';

import Index from "./components/start/index"; // 시작 페이지

import Login from "./components/auth/login"; // 로그인 페이지
import Signup from "./components/auth/signup"; // 회원가입 페이지

import Main from "./pages/main"; // 메인 페이지
import UserInfo from "./pages/userInfo"; // 내 정보 페이지
import ModifiedUserInfo from "./components/userInfo/setProfile"; // 내 정보 수정 페이지

import Friend from "./pages/friend"; // 친구 페이지
import Message from "./pages/message"; // 쪽지 페이지

import AddCalculate from "./pages/addCalculate"; // 일정 추가 페이지
import Calculate from "./pages/calculateDetail"; // 일정 상세 페이지
import MoidfyCalculate from "./pages/moidfyCalculate"; // 일정 수정 페이지

import AddCost from "./pages/addCost"; // 지출 추가 페이지
import ModifyCost from "./pages/modifyCost"; // 지출 수정 페이지

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Index />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/main" element={<Main />}></Route>
        <Route path="/userInfo" element={<UserInfo />}></Route>
        <Route path="/userinfo/modify" element={<ModifiedUserInfo />}></Route>

        <Route path="/friend" element={<Friend />}></Route>
        <Route path="/message" element={<Message />}></Route>

        <Route path="/calculate" element={<AddCalculate />}></Route>
        <Route path="/calculate/:num" element={<Calculate />}></Route>
        <Route path="/calculate/:num/modify" element={<MoidfyCalculate />}></Route>

        <Route path="/calculate/:num/cost" element={<AddCost />}></Route>
        <Route path="/calculate/:num/cost/:costNum" element={<ModifyCost />}></Route>
      </Routes>
    </>
  );
}

export default App;
