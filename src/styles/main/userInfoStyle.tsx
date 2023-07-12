import styled from "styled-components"; 

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100vh;
min-height: 100vh;
background-color: #322c58;
overflow: scroll;

-ms-overflow-style: none; /* 인터넷 익스플로러 */
scrollbar-width: none; /* 파이어폭스 */
/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
&::-webkit-scrollbar {
  display: none;
}

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  flex-direction: row;
  height: 60px;
  min-height: 60px;
  overflow: visible;
}

@media screen and (max-width: 600px) {
  flex-direction: column;
  height: 100%;
  overflow: visible;
}
`

/* 친구 리스트 & 메시지 아이콘들 */
export const Container__Icon = styled.div`
width: 100%;
text-align: right;
padding: 20px 20px 0 0;

& {
  color: #bac7fb;
  font-size: 1.5rem;
}

& :nth-child(1) { padding-right: 10px; }

@media screen and (max-width: 1023px) {
  display: none;
}
`

export const Container__Info = styled.div`
display: flex;
flex-direction: row;
width: 100%;

& > :nth-child(2) {
  display: none;
}

@media screen and (max-width: 1023px) { 
  width: auto;
  padding-left: 10px;
}


@media screen and (max-width: 600px) { 
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;

  & > :nth-child(2) {
    display: block;
    padding-right: 10px;
    font-size: 1.5em;
    color: #ffffff;
  }
}
`

/* 유저 프로필 정보 */
export const Container__Profile = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding: 20px 0;
gap: 20px;
position: static;

@media screen and (max-width: 1023px) { 
  width: auto;
  flex-direction: column;
  padding: 0;
  position: relative;
}
`

/* 프로필 */
export const Container__Profile_Image = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
max-width: 250px;
gap: 20px;

  & div {
    width: 90%;
    background-color: #ffffff;
    border-radius: 70%;
    padding-top: 90%;
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 70%;
      padding-top: 0%;
      outline: 5px solid white;
      position: absolute;
      top: 0;
    } 
  }

  & p { // 사용자 닉네임
    color: #b7b6d6;
    font-size: 2rem;
    font-weight: bold;
  }

@media screen and (max-width: 1023px) { 
  min-width: 40px;
  max-width: 40px;

  & div {
    & img {
      outline: 2px solid #d3d3d3;
    }
  }

  & > p {
    display: none;
  }
}
`
interface UserInfo_Props {
  visible: string | undefined;
}

/* 유저 정보: 모바일 버전 */
export const Container__UserInfoDiv_mobile = styled.div`
display: none;
width: 200px;
background-color: #e0e0e0;
border-radius: 10px;
box-shadow: 0 5px 20px rgba(71, 71, 71, 0.8);
overflow: hidden;
position: absolute;
top: 53px;
left: 5px;
z-index: 30;

@media screen and (max-width: 1023px) { 
  display: ${ (props: UserInfo_Props) => props.visible };
}
`

/* 내 정보 & 정보 수정 버튼*/
export const Container__Info_Btn = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
height: auto;
padding-bottom: 20px;

& > input {
  width: 35%;
  height: 40px;
  background-color: #322c58;
  color: #bac7fb;
  font-weight: bold;
  border: 3px solid #bac7fb;
  border-radius: 20px;
  margin: 0 5px;
  cursor: pointer;
}

@media screen and (max-width: 1023px) { 
  display: none;
}
`

interface Visible_Props {
  visible: string | undefined;
}

/* 약속 리스트 종류 출력 */
export const Container__ListType = styled.div`
width: 100%;
height: auto;
background-color: #322c58;

@media screen and (max-width: 1023px) { 
  height: 60px;
  padding: 0;
}

@media screen and (max-width: 600px) { 
  display: ${ (props: Visible_Props) => props.visible };
  height: auto;
}
`
