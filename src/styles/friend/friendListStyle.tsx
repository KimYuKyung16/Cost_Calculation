import styled from "styled-components"; 

export const Container = styled.section`
width: 100%;
height: 100%;
background-color: #ffffff;
position: relative;
`

/* 친구 리스트  */
export const Container__friendList = styled.table`
width: 100%;
height: 100%;
border-spacing: 0px;
border-collapse: separate;
font-size: 1.2em;
font-weight: bold;
color: #4f4f4f;

& tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
}

& td {
  display: flex;
  align-items: center;
}

& td:nth-child(1) { // 프로필 & 닉네임
  width: 100%;
  height: 100%;
}

& td:nth-child(2) { // 삭제 아이콘
  height: 100%;

  & > img {
    height: 20px;
  }
}

@media screen and (max-width: 768px) { 
  font-size: 1.1rem;

  & td:nth-child(2) { // 삭제 아이콘
    & > img {
      height: 15px;
    }
  }
}
`

/* 친구 추가 창 띄우는 버튼 */
export const Container__button = styled.img`
display: none;
align-items: center;
justify-content: center;
width: 10vw;
height: 10vw;
min-width: 50px;
min-height: 50px;
position: absolute;
right: 5vw;
bottom: 7vw;

& > img {
  height: 80%;
}

@media screen and (max-width: 768px) { 
  display: block;
}
`

export const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70px;
border: 1px solid #bfbfbf;
margin-right: 5px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
}
`