import styled from "styled-components";
import Header from "../components/message/header";
import List from "../components/message/messageList";
import { useNavigate } from "react-router-dom";
import { authentication } from "../apis/api/user";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Message() {
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
    <Container>
      <Header />
      <List />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #322c58;
  padding: 0 auto;
`;

export default Message;
