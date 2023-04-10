import styled from "styled-components"; 

export const Header_ = styled.header`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
height: 40px;
background: #322c58;
border-bottom: 1px solid #ffffff;
overflow: auto;

& > img {
  height: 80%;
  padding-left: 15px;
}

@media screen and (max-width: 768px) { 
  & > img {
    height: 60%;
  }
} 
`