import styled from "styled-components";

export const Header_ = styled.header`
display: flex;
align-items: center;
flex-direction: row;
height: 40px;
background-color: #322c58;
border-bottom: 1px solid #ffffff;

* { 
  color: white;
  font-size: 1.2rem;
}
`

export const Header__title = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
height: 100%;

& > img:nth-child(1) { // 뒤로가기 아이콘
  height: 40%;
  padding: 0 10px;
}

& > img:nth-child(2) { // 로고 이미지
  height: 50%;
}

& > p:nth-child(3) {
  padding-left: 5px;
  font-size: 1.2rem;

  & > span {
    color: yellow;
    font-size: 1.2rem;
  }
} 
`
