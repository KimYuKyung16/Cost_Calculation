import styled from "styled-components"; 

export const Profile = styled.img`
width: 120px;
height: 120px;
border-radius: 70px;
border: 1.5px solid #a5a5a5;
margin: 10px;
`

export const Container = styled.ul`
text-align: center;
padding: 0;
list-style: none;

& > li:nth-child(2) {
  font-size: 1.5rem;
  padding-bottom: 10px;
  
  & > span {
    color: #44466b;
    font-weight: 700;
  }
}

& > li:nth-child(n+3) {
  text-align: left;
  color: #535353;
  font-weight: 500;
  font-size: 1.2rem;
  font-family: "NotoSans";
  padding: 15px 10px;
}

& > li:nth-child(n+3):hover { // 3번째부터 끝까지
  background-color: #44466b;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
`
