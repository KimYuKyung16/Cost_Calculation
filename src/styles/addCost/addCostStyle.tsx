import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
min-width: 768px;
background-color: #322c58;
padding: 0 auto;

@media screen and (max-width: 768px) {
  min-width: 100vw;
} 
`

/* 비용 제목 */
export const Container__Title = styled.div`
width: 100%;
height: 60px;
margin: 20px 0;

& > input { // 제목
  width: 100%;
  height: 100%;
  padding: 0 5%;
  background-color: #322c58;
  border: none;
  border-bottom: 1px solid #ffffff;
  outline: none;
  color: #ffffff;
  font-size: 2rem;

  ::placeholder {
    color: #a2a2a2;
  }
}

@media screen and (max-width: 768px) {
  display: flex;
  justify-content: center;
  height: 40px;

  & > input { // 제목
    width: 90%;
    font-size: 1.5rem;
    padding: 0 10px;
  }
} 
`

/* 지출 금액 & 지출인 */
export const Container__Contents = styled.div`
width: 100%;
height: 70px;
padding: 0 5%;

@media screen and (max-width: 768px) {
  height: 50px;
} 
`

/* 지출 금액 & 지출인 */
export const Contents_Cost_Payer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 20px;
position: relative;
height: 100%;

& > p { // 안내 문구
  position: absolute;
  bottom: 0;
  right: 50%;
  font-size: 1.2rem;
  color: #ffff13;
}

@media screen and (max-width: 768px) {
  gap: 10px;

  & > p { // 안내 문구
    font-size: 1rem;
  }

} 
`

/* 지출 금액 */
export const Contents_Cost = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 60%;
height: 50px;
border-radius: 4px;
overflow: hidden;
position: relative;

& > input { // 금액
  -moz-appearance: textfield; // firefox에서 화살표 제거
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: right;
  padding-right: 35px;
  font-size: 2rem;
  color: #000000;
  outline: none;
  border: none;
  font-weight: bold;

  // chrome, safari, edge, opera에서 화살표 제거
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

& > p { // '원'
  position: absolute;
  color: #000000;
  font-size: 2rem;
  right: 10px;
}

@media screen and (max-width: 768px) {
  height: 30px;

  & > input { // 금액
    font-size: 1.5rem;
    padding-right: 30px;
  }

  & > p { // '원'
    font-size: 1.5rem;
  }
} 
`

/* 지출인 */
export const Contents_Payer = styled.select`
background-color: #ffffff;
width: 20%;
height: 50px;
font-size: 1.5rem;
border-radius: 4px;
padding-left: 5px;
outline: none;

@media screen and (max-width: 768px) {
  height: 30px;
  font-size: 1.2rem;
  padding: 0;
} 
`

/* 지출 내용 */
export const Container__Content = styled.div`
width: 100%;
margin-bottom: 20px;
padding: 0 5%;

& > textarea {
  width: 100%;
  height: 400px;
  background-color: #322c58;
  margin-top: 10px;
  padding: 15px;
  color: #ffffff;
  font-size: 1.5rem;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  & > textarea {
    font-size: 1.2rem;
  }
} 
`

/* 등록 버튼 */
export const Container__RegisterBtn = styled.div`
text-align: center;
padding: 0 5%;
width: 100%;
margin-bottom: 20px;

& > input {
  width: 50%;
  height: 40px;
  background-color: #74b99a;
  color: #ffffff;
  font-weight: 600;
  border-radius: 8px;
  border: none;
}

@media screen and (max-width: 768px) {
  & > input { 
    width: 80%;
    max-width: 500px;
    padding: 0;
  }
} 
`


export const Test = styled.button`
background-color: white;
font-size: 1.5rem;
width: 100%;
white-space: nowrap;
height: 50px;
padding: 0 10px;
border-radius: 5px;

@media screen and (max-width: 768px) {
  height: 30px;
  font-size: 1.2rem;
} 
`