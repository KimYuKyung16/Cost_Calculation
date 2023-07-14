/**
 * 일정 수정
 *
 */
import styled from "styled-components";
import Header from "../components/modifyCost/header";
import ModifyCost from "../components/modifyCost/modifyCost";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { authentication } from "../apis/api/user";
import { useEffect } from "react";

function Modify_Cost() {
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
        <ModifyCost />
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 40px);
  background-color: #322c58;
  padding: 0 20%;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export default Modify_Cost;
