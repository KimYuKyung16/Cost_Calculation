import styled from "styled-components";

export const Header_ = styled.header`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
background-color: #e4e4e4;
padding: 10px 0;
border-bottom: 2px solid #a1a1a1;
position: sticky;
top: 0;
z-index: 1;

& > h2 {
  font-size: 2.3rem;
}

& > div { // 멤버별 필터링, 지출 내역 등록 
display: flex;
flex-direction: row;
align-items: center;
width: 50%;
height: 80%;
max-width: 300px;

  & > input { // 지출 내역 등록 버튼
    width: 50%;
    height: 100%;
    border: none;
    background-color: #74ba97;
    color: #ffffff;
    font-weight: bold;
    border-radius: 10px;
    font-size: 1.3rem;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) { 
  & > h2 {
    font-size: 2rem;
  }

  & > div { // 멤버별 필터링, 지출 내역 등록 
    & > input {  // 지출 내역 등록 버튼
      font-size: 1.1rem;
    }
  }
} 
`

/* 정산 완료 버튼 */
export const Header__CompleteBtn = styled.div`
display: flex;
align-items: center;
gap: 3px;

& > p {
  font-size: 1.3rem;
  font-weight: 700;
}
`

/* 멤버 별 필터링 */
export const Header__SelectUser = styled.div` 
width: 50%;
height: 100%;
margin: 0 10px 0 15px;

& > select {
  width: 100%;
  height: 100%;
  background-color: #d7d7d7;
  color: #322d59;
  border: 1px solid #bebebe;
  border-radius: 10px;
  outline: none;
  font-size: 1.3rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) { 
  & > select {
    font-size: 1.1rem;
  }
} 

@media screen and (max-width: 300px) { 
  margin: 0 5px 0 5px;
} 
`