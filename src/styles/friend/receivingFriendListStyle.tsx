import styled from "styled-components"; 

export const Container = styled.main`
width: 100%;
height: 100%;
background-color: #322c5a;
padding: 10px 0;
`

/* 친구 신청 받은 리스트 */
export const Container__List = styled.table`
width: 100%;
height: 100%;
border-spacing: 0px;
border-collapse: separate;
font-weight: bold;
background-color: #322c58;
color: #4f4f4f;

& tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #b3b9d3;
  padding: 5px;
  border-radius: 8px;
}

& td:nth-child(1) { // 프로필 & 이름
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
}

& td:nth-child(2), td:nth-child(3) { // 친구 수락, 거절 버튼
  width: auto;

  & > input {
    background-color: #9d9d9d;
    border: 1px solid #bfbfbf;
    color: #ffffff;
    font-weight: 500;
    padding: 3px 15px;
    font-size: 1.3rem;
    border-radius: 8px;
    margin-left: 5px;
  }
}

& td:nth-child(3) { // 친구 거절 버튼
  & > input {
    background-color: #ff6b6b;
    color: #ffffff;
  }
}

@media screen and (max-width: 768px) { 
  & td:nth-child(2), td:nth-child(3) { // 친구 수락 버튼
    & > input {
      padding: 3px 10px;
      font-size: 1.2rem;
    }
  }
} 
`

/* 친구 신청이 없을 경우 */
export const Container__List_None = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

& h3 {
  color: #b5b8d5;
  font-size: 1.2rem;
  margin-bottom: 70px;
}
`

export const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70px;
border: 1px solid #bfbfbf;
margin-right: 3px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
} 
`