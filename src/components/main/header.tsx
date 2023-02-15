import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'; // styled in js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2vw;

  & > div > p {
    font-size: 1.4em;
    color: #6f6fad;
  }
`

const Main__Info = styled.div`
  position: relative;
`

interface Info_Props {
  visible: string | undefined;
}


const Info = styled.div`
  position: absolute;
  background-color: #e7e7e7;
  display: ${(props: Info_Props) => props.visible };
  right: 0;
  top: 60px;
  white-space: nowrap;;
  padding: 0 20px;
  border: 1px solid #582c2c;

  border: #322c58 solid 1px;
  border-radius: 5px;
  color: #322c58;
  font-size: 0.9em;
  font-weight: bold;
  height: auto;
  letter-spacing: -0.25px;
  width: fit-content;

  &::after {
    border-color: #e7e7e7 transparent;
    border-style: solid;
    border-width: 0px 6px 8px 6.5px;
    content: '';
    display: block;
    right: 5px;
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
    
  }

  &::before {
    border-color: #322c58 transparent;
    border-style: solid;
    border-width: 0 6px 8px 7px;
    content: '';
    display: block;
    right: 5px;
    position: absolute;
    top: -8.2px;
    width: 0;
    z-index: 0;
  }
`

function Header() {

  let [infoVisible, setInfoVisible] = useState('none');

  const infoMouseOver = () => {
    setInfoVisible('block')
  }

  const infoMouseOut = () => {
    setInfoVisible('none')
  }

  return(
    <>
      <Main>
        <h2>📃 일정 목록</h2>
        <Main__Info>
          <p><FontAwesomeIcon onMouseOver={infoMouseOver} onMouseOut={infoMouseOut} icon={faInfoCircle}/></p>
          <Info visible={infoVisible}>
            <p>스크롤로 리스트를 확인하세요</p>
          </Info>
        </Main__Info>
        
      </Main>

      <hr/>
    </>
  )
}

export default Header;