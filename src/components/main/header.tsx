import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'; // styled in js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘



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

const Main = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 1vw 2vw;

& > h2 {
  font-size: 2.2rem;
}

& > div > p { // 안내 아이콘
  font-size: 2rem;
  color: #6f6fad;
}

@media screen and (max-width: 768px) { 
  & > h2 {
    font-size: 1.9rem;
  }

  & > div > p { // 안내 아이콘
    font-size: 1.7rem;
  }
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
top: 45px;
white-space: nowrap;;
padding: 10px 20px;
border: 1px solid #582c2c;

border: #322c58 solid 1px;
border-radius: 5px;
color: #322c58;
font-size: 1.4rem;
font-weight: bold;
height: auto;
letter-spacing: -0.25px;
width: fit-content;

z-index: 2;

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

@media screen and (max-width: 768px) { 
  top: 35px;
  padding: 5px 10px;
  font-size: 1.2rem;
} 
`

export default Header;