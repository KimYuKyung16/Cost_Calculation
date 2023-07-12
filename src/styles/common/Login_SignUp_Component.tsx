/**
 * 로그인 페이지와 회원가입 페이지의 공통적인 컴포넌트들
 * 
 * */  

import styled from 'styled-components'; 

export const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #322c58;
padding-bottom: 15vh;
box-sizing: border-box;
`

export const Main__Logo = styled.img` // 로고
width: 200px;
padding-bottom: 20px;
`

export const Main__Components = styled.div` // 컴포넌트들
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 30vw;

@media screen and (max-width: 1023px) { 
  width: 50vw;
}
`

export const Etc_components = styled.div`
display: flex;
flex-direction: column;
width: 60%;
min-width: 250px;

@media screen and (max-width: 1023px) { 
  width: 70%;
}
`

export const Component_Input = styled.input` // 입력값
width: 100%;
height: 40px;
margin-bottom: 10px;
padding: 10px;
box-sizing: border-box;
border: none;
outline: none;
border-radius: 7px;
`

export const Component_btn = styled.input` // 로그인, 회원가입 버튼
width: 100%;
background-color: #74b99a;
border: none;
padding: 10px;
color: #3b3b3b;
font-weight: bold;
border-radius: 10px;
cursor: pointer;
&:hover {
  background-color: #5b8f78;
  color: #ffffff;
}
`
 