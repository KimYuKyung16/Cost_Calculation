/**
 * 헤더
 *
 */
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from "../../styles/addCalculate/headerStyle";

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyle.Header_>
      <img
        onClick={() => {
          navigate(-1);
        }}
        src="image/logo_name.png"
      />
    </HeaderStyle.Header_>
  );
}

export default Header;
