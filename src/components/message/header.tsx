/**
 * 쪽지 페이지 - 헤더
 *
 * */
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from "../../styles/message/headerStyle";

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyle.Header_>
      <img
        onClick={() => {
          navigate("/main");
        }}
        src="/image/back_icon.svg"
      />

      <HeaderStyle.Header__title>
        <img src="/image/logo_purple.svg" />
        <p>쪽지</p>
      </HeaderStyle.Header__title>
    </HeaderStyle.Header_>
  );
}

export default Header;
