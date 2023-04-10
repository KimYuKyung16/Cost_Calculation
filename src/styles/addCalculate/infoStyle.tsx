import styled from "styled-components"; 

export const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: auto;
max-width: 800px;
background-color: #322c58;
color: #ffffff;
padding: 40px 20px 50px 20px;

& > h2 { 
  font-size: 3rem;
  margin-bottom: 20px;
  white-space: nowrap;
}

@media screen and (max-width: 768px) { 
  & > h2 {
    font-size: 2rem;
  }
} 
`

export const Container__information = styled.section`
display: flex;
flex-direction: column;
width: 100%;
font-size: 2rem;
gap: 15px;

@media screen and (max-width: 768px) { 
  gap: 10px;
} 
`

/* 일정 이름 */
export const AppointmentName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;

& > label {
  margin-right: 10px;
  white-space: nowrap;
}

& > input { // 일정 이름
  width: 100%;
  color: #535353;
  font-size: 2rem;
  padding: 15px;
  margin-right: 20px;
  border: 1px solid #322c58;
  border-radius: 10px;
}

::after {
  content: '';
  width: 100px;
}

@media screen and (max-width: 768px) { 
  & > label {
    display: none;
  }

  & > input {
    font-size: 1.5rem;
    padding: 10px;
    margin: 0;
  }

  ::after {
    display: none;
  }
}
`

/* 인원 추가 */
export const Member = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
gap: 10px;

& > label {
  white-space: nowrap;
}

& > input { // 추가 버튼
  background-color: #322c58;
  color: #b4b8d3;
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
  border: 3px solid #b4b8d3;
  border-radius: 10px;
  padding: 15px;
  margin-right: 10px;
}

@media screen and (max-width: 768px) { 
  gap: 5px;

  & > label {
    display: none;
  }

  & > input { // 추가 버튼
    font-size: 1.5rem;
    padding: 9px;
    margin: 0;
    border: 2px solid #b4b8d3;
  }
}
`

/* 멤버 검색 */
export const Member_Search = styled.div`
width: 100%;
position: relative; 

& > input { // 멤버 이름
  width: 100%;
  color: #535353;
  font-size: 2rem;
  border: 1px solid #322c58;
  border-radius: 10px 10px 0 0;
  padding: 15px 15px;
}

@media screen and (max-width: 768px) { 
  & > input {
    font-size: 1.5rem;
    padding: 10px 10px;
  }
} 
`

/* 멤버 검색: 친구 검색 */
export const Member_FriendList = styled.table`
width: 100%;
background-color: #ffffff;
border: 1px solid #322c58;
border-radius: 0 0 10px 10px;
border-collapse: separate;
overflow: hidden;
position: absolute;
top: 53px;
z-index: 1;

@media screen and (max-width: 768px) { 
  top: 38px;
} 
`

/* 친구 리스트 */
export const List = styled.tbody`
width: 100%;

& > tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  color: #5f5f5f;
  padding: 5px 10px;
  cursor: pointer;
}

& td:nth-child(1) {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;  
  gap: 10px;
}

@media screen and (max-width: 768px) { 
  & td:nth-child(1) {
    font-size: 1.2rem;
    gap: 5px;
  }
} 
`

export const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70%;

@media screen and (max-width: 768px) { 
  width: 35px;
  height: 35px;
} 
`