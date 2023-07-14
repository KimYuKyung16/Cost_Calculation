/**
 * 친구 목록: 헤더
 *
 */
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from "../../styles/friend/headerStyle";

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyle.Header_>
      <img
        onClick={() => {
          navigate(-1);
        }}
        src="/image/back_icon.svg"
      />
      <HeaderStyle.Header__title>
        <img src="/image/logo_purple.svg" />
        <p>친구 목록</p>
      </HeaderStyle.Header__title>
    </HeaderStyle.Header_>
  );
}

export default Header;
