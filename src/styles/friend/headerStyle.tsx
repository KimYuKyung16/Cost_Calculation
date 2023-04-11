import styled from "styled-components";

export const Header_ = styled.header`
display: flex;
flex-direction: row;
align-items: center;
height: 100%;
background-color: #322c58;
padding-left: 10px;

* { // 전체
  color: white;
  font-size: 1.2rem;
}

& > img {
  height: 40%;
  padding-right: 5px;
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

& p {
  padding-left: 5px;
}
`