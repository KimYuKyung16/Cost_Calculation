import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
min-height: calc(100vh - 40px);
background-color: #322c58;
overflow: auto; 

-ms-overflow-style: none;
scrollbar-width: none;
&::-webkit-scrollbar {
  display: none;
} 

& hr {
  width: 100%;
  height: 1px;
  background-color : #cbcbcb;
  border: none;
}

& h5 {
  color: #c9c9c9;
  margin: 10px 0 10px 10px;
  font-size: 1.5rem;
}
`

interface fontsize {
  size: number;
}

/* 총 비용, 1인당 지출 비용 */
export const Container__Common_Expense = styled.div`
font-size: 1.3rem;
color: #d8d8d8;

& > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
  
  & > p:nth-child(1) { // 라벨
    font-weight: bold;
    padding-right: 10px;
  }

  & > p:nth-child(2) { // 비용
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 5px;
  }

  & span {
    font-size: ${(props: fontsize) => props.size}rem;
    color: #ffffff;
  }
}
`

/* 내 정보 */
export const Container__Members_myInfo = styled.ul`
display: flex;
flex-direction: row;
background-color: #6f6fae;
margin: 10px;
padding: 2%;
outline: 2px solid #fdfdfd;

* {
  list-style: none;
}

& > li:first-child { // 내 정보
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 10px;
  padding: 10px;
  position: relative;
  
  & > img:first-child {
    position: absolute;
    top: 0;
  } 
}

& > li:last-child { // 비용
  display: flex;
  flex-direction: row;
  align-items: center;
}
`

/* 나를 제외한 멤버들 정보 */
export const Container__Members_memberInfo = styled.ul`
display: flex;
flex-direction: row;
margin: 0 10px;
padding: 2%; 
border-bottom: 0.5px solid #e6e6e6;

* {
  list-style: none;
}

& > li:first-child { // 멤버 정보
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.1rem;
  margin-right: 10px;
  padding: 10px;
  position: relative;
}

& > li:last-child { // 비용
  display: flex;
  flex-direction: row;
  align-items: center;
}
`

/* 내 프로필 사진 */
export const MyProfile = styled.img`
width: 60px;
height: 60px;
margin-bottom: 5px;
border-radius: 70px;
border: 1px solid #fdff90;

@media screen and (max-width: 768px) { 
  width: 50px;
  height: 50px;
}
`

/* 다른 멤버들의 프로필 사진 */
export const Profile = styled.img`
width: 55px;
height: 55px;
margin-bottom: 5px;
border-radius: 70px;
border: 1px solid #c5c5c5;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
}
`

/* 지출 비용 */
export const List= styled.ul`
color: #e6e6e6;

& > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  padding: 5px 0;
  white-space: nowrap;

  & > span {
    background-color: #b6b7d2;
    color: #322c58;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 8px;
  }
  
  & > hr {
    width: 1px;
    height: 15px;
    background-color: #b5b9d4;
    margin: 0 5px;
  }
}
`