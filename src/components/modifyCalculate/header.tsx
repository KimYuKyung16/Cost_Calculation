/**
 * 정산 수정 - 헤더
 *
 */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import * as HeaderStyle from "../../styles/addCost/headerStyle";

function Header() {
  const navigate = useNavigate();
  const params = useParams();
  const num: string | undefined = params.num;
  const calculateState = useAppSelector((state) => state.calculate); // 정산 정보

  return (
    <HeaderStyle.Header_>
      <HeaderStyle.Header__title>
        <img
          onClick={() => {
            navigate(-1);
          }}
          src="/image/back_icon.svg"
        />
        <img src="/image/appointment_logo_icon.svg" />
        <p>
          {calculateState.calculateName}
          {" > "}
          <span>수정</span>
        </p>
      </HeaderStyle.Header__title>
    </HeaderStyle.Header_>
  );
}

export default Header;
