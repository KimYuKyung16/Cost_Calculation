import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #322c58;
padding: 3% 10px 50px 10px;
`

/* 쪽지 헤더 */
export const Container__Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
width: 100%;
max-width: 800px;
margin-bottom: 10px;
padding: 0 15px;
padding-bottom: 10px;
border-bottom: 1px solid #ffffff;

& > h1 { // 타이틀
  color: #ffffff;
}

& > p { // 전체 삭제
  color: #ffec42;
  font-size: 1.2rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) { 
  width: 100%;
} 
`

/* 쪽지 리스트 */
export const Container__MessageList = styled.ul`
width: 100%;
max-width: 800px;
border: 1px solid #ffffff;
border-radius: 10px;

& > li {
  border-bottom: 1px solid #ffffff;
}

& > li:last-child {
  border-bottom: none;
}

@media screen and (max-width: 768px) { 
  width: 100%;
} 
`

interface IMessageState {
  state: string
}

export const Container__Message = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
height: 50px;
padding: 0 20px;

& > div:nth-child(1) { // 내용
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  & > img { // 종 아이콘
    height: 40%;
  }

  & > p { // 쪽지 내용
    color: ${(props: IMessageState) => props.state === 'true' ? '#aaaec7' : '#e0e0e0'};
    font-size: 1.3rem;
    cursor: pointer;
  }
}

& > div:nth-child(2) { // 읽음표시, 삭제
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 1.1rem;

  & > p:nth-child(1) { // 읽음 표시
    color: #b4b8d3;
  }

  & > p:nth-child(2) { // 삭제
    color: #fff069;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) { 
  height: 45px;
  padding: 0 15px;
}
`

export const Container__Message_none = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
height: calc(100vh - 200px);
color: #ffffff;
font-size: 1.5rem;
padding-bottom: 10%;

@media screen and (max-width: 768px) { 
  font-size: 1.2rem;
}
`