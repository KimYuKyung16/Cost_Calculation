/**
 * 정산 리스트 : 헤더
 * 
 */
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // 안내 아이콘

import * as SHeader from "../../../styles/main/headerStyle"; // 헤더 스타일


function Header() {
  let [infoVisible, setInfoVisible] = useState<string>('none');

  const infoMouseOver = () => { setInfoVisible('block') }
  const infoMouseOut = () => { setInfoVisible('none') }

  return(
    <>
      <SHeader.Conatiner>
        <h2>📃 일정 목록</h2>
        <SHeader.Conainer__Info>
          <p><FontAwesomeIcon onMouseOver={infoMouseOver} onMouseOut={infoMouseOut} icon={faInfoCircle}/></p>
          <SHeader.Info visible={infoVisible}>
            <p>스크롤로 리스트를 확인하세요</p>
          </SHeader.Info>
        </SHeader.Conainer__Info>
      </SHeader.Conatiner>

      <hr/>
    </>
  )
}


export default Header;