import styled from 'styled-components';


export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%; 
height: 100%;
`

/* 일정 리스트 */
export const Container__List = styled.table`
table-layout: fixed; 
width: 100%;
`

/* 정산 리스트가 없을 경우 */
export const Container__calculateList__none = styled.tbody`
display: flex;
justify-content: center;
padding: 10% 0;
font-size: 1.5rem;

& td {
  text-align: center;
  color: #5b5b5b;
}

@media screen and (max-width: 768px) { 
  font-size: 1.2rem;
} 
`

/* 정산 리스트가 있을 경우 */
export const Container__calculateList = styled.tbody`
& tr { // 한 개의 리스트
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e3e3e3;
  padding: 0 3%;
}

& td {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
}

& td:nth-child(1) { // 즐겨찾기 & 제목 & 멤버들
  width: 75%;
}

& td:nth-child(2) { // 날짜 & 정산 상태
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 25%;
  padding: 0;
  white-space: nowrap;
  gap: 10px;
}

@media screen and (max-width: 600px) {
  & tr {
    height: 50px;
  }

  & td:nth-child(2) { // 날짜 & 정산 상태
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 2px;
  }
}
`

/* 즐겨찾기 & 제목 */
export const Container__Title = styled.div`
display: flex;
flex-direction: row;
width: 90%;
align-items: center;
padding-right: 20px;

& > p:nth-child(2) {
  color: #000000;
  font-size: 1.7rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 10px;
  overflow: hidden;
  cursor: pointer;
}

& > span {
  color: #d24b4b;
  font-size: 1.7rem;
} 

@media screen and (max-width: 768px) { 
  & > p:nth-child(2) {
    font-size: 1.4rem;
  }

  & > span {
    font-size: 1.4rem;
  }
} 

@media screen and (max-width: 600px) { 
  width: 100%;
}
`

/* 즐겨찾기 이미지 */
export const Star = styled.img`
width: 25px;
height: 25px;
margin-right: 10px;
filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.12));
cursor: pointer;

@media screen and (max-width: 600px) {
  width: 20px;
  height: 20px;
}
`

/* 멤버들 프로필 사진 */
export const Container__List__Members = styled.div`
width: 10%;

& div {
  padding-top: 0%;
  max-width: 50px;
  max-height: 50px;

    & div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-flow: wrap-reverse;
      width: 100%;
      max-width: 70px;
      max-height: 70px;
      padding-top: 0%;

      & div {
        width: 50%;
        max-width: 30px;
        max-height: 30px;
        padding-top: 50%;
        border-radius: 10px;
        position: relative;

        & img {
          width: 100%;
          height: 100%;
          border: 1px solid #bfbfbf;
          border-radius: 9px;
          padding-top: 0%;
          position: absolute;
          top: 0;
        } 
      }
    }
}

@media screen and (max-width: 600px) { 
  display: none;
}
`

interface State_Props {
  state: string | undefined;
}

/* 날짜 */
export const Container__Date = styled.div`
color: #6c6c6c;
font-size: 1.3rem;
padding: 0;

@media screen and (max-width: 768px) { 
  font-size: 1.2rem;
}
`

/* 정산 상태 */
export const Container__State = styled.div`
background-color: ${(props: State_Props) => props.state === 'true' ? '#72bc93' : '#b6b7d5' };
color: #ffffff;
font-size: 1.3rem;
white-space: nowrap;
padding: 3px 10px;

@media screen and (max-width: 768px) { 
  font-size: 1rem;
} 
`

interface Loading_Props {
  visible: boolean | undefined | null;
}

/* 로딩 부분 */
export const Container__Loading = styled.div`
display: ${(props: Loading_Props) => props.visible ? 'block' : 'none' };
height: 100%;
width: 100%;
text-align: center;

& > img {
  width: 100px;
  height: 100px;
}
`