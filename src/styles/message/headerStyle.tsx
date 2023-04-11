import styled from "styled-components";

export const Header_ = styled.div`
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
height: 40px;
background-color: #322c58;
padding-left: 10px;
border-bottom: 1px solid #ffffff;

& { // 전체
  color: white;
  font-size: 1.2rem;
}

& > img {
  height: 40%;
  padding-right: 5px;
}

& > p {
  height: 80%;
}
`

export const Header__title = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
height: 100%;

 & img { // 로고 이미지
   width: auto;
   height: 60%;
   border-radius: 70px;
 }

 & > p:nth-child(2) {
   padding-left: 5px;
 }

 & > p:nth-child(3) {
   padding-left: 5px;
   color: yellow;
 }
`