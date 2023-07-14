/**
 * 일정 추가
 *
 */
import styled from "styled-components"; // styled in js
import Header from "../components/addCalculate/header";
import Info from "../components/addCalculate/info"; // 일정 정보
import MemberList from "../components/addCalculate/memberList"; // 추가된 멤버 리스트
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { authentication } from "../apis/api/user";
import { useEffect } from "react";

function AddCalculate() {
  const navigate = useNavigate();
  
  const user = async () => {
    const state = await authentication();
    if (state.status === 500) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: state.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Info />
        <MemberList />
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #322c58;
`;

export default AddCalculate;
