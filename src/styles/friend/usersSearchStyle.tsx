import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;  
width: 100%;
background-color: #322c5a;
`

/* 아이디 검색창 */
export const Container__Search = styled.div`
display: flex;
flex-direction: row;
width: 100%;
background-color: #ffffff;
align-items: center;
justify-content: center;
border: 1px solid #322c5a;
border-bottom: none;
box-sizing: border-box;
padding: 5px;

& :nth-child(1) { // 아이디 입력창
  width: 100%;
  border: none;
  font-size: 1.4rem;
  background-color: #ffffff;
  outline: none;
  padding: 7px;
}

& :nth-child(2) { // 검색 아이콘
  color: #322c58;
  height: 80%;
}

@media screen and (max-width: 768px) { 
  padding: 4px;

  & :nth-child(1) { // 아이디 입력창
    font-size: 1.3rem;
    padding: 5px;
  }

  & :nth-child(2) { // 검색 아이콘
    height: 70%;
  }
} 
`

/* 검색된 유저 리스트 div*/
export const Container__list = styled.div`
position: relative;
width: 100%;
`

/* 검색된 유저 리스트 */
export const Container__list_memberList = styled.table`
border-spacing: 0px;
border-collapse: separate;
width: 100%;
height: 100%;
background-color: #ffffff;
font-size: 1.3rem;
font-weight: 700;
color: #4f4f4f;
border: 1px solid #322c5a; // 화면 커졌을 때 이상한 줄 원인
position: absolute;
z-index: 1;

& tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  padding: 8px 10px;
}

& td:nth-child(1) { // 프로필 & 닉네임
  display: flex;
  align-items: center;
  width: 100%;
}

& td:nth-child(2) { // 친구 추가 버튼
  display: flex;
  align-items: center;
  padding-left: 10px;

  & input {
    font-size: 1.1rem;
    background-color: #fff08b;
    color: #5c5b5b;
    font-weight: 500;
    border: 1px solid #bfbfbf;
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) { 
  font-size: 1.1rem;

  & tr {
    padding: 6px 7px;
  }

  & td:nth-child(2) { // 친구 추가 버튼
    padding-left: 5px;

    & input {
      font-size: 0.9rem;
      padding: 5px 7px;
    }
  }
} 
`

/* 유저 프로필 */
export const Profile = styled.img`  
width: 50px;
height: 50px;
border: 1px solid #bfbfbf;
border-radius: 70px;
margin-right: 7px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
  margin-right: 5px;
} 
`
