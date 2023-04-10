import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
background-color: #ffffff;
padding: 20px 20px 150px 20px;

& > p {
  font-size: 2rem;
  font-weight: 700;
  color: #515151;
  margin: 10vw 0;
}

& > input {
  background-color: #73ba9a;
  border: none;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  color: #ffffff;
  font-weight: 700;
  margin-top: 30px;
  font-size: 1.7rem;
  cursor: pointer;

  :hover {
    background-color: #65b490;
    color: #ffffff;
  }
}

@media screen and (max-width: 768px) { 
  padding: 10px 10px 100px 10px;

  & > p {
    font-size: 1.5rem;
    margin: 20vw 0;
  }

  & > input {
    font-size: 1.5rem;
    padding: 10px;
  }
} 
`

export const Container__memberList = styled.table`
display: flex;
flex-direction: row;
justify-content: space-between;
flex-wrap: wrap;
width: 100%;
max-width: 800px;
border-collapse: collapse; 
`

export const Member_List = styled.tbody`
width: 100%;
`

export const Member = styled.tr`
width: 100%;
border-bottom: 1px solid #e0e0e0;

:last-child {
  border: none;
}

& > td {
  width: 100%;
  padding: 10px;

  :nth-child(1) { // 프로필
    width: auto;
    white-space: nowrap;
  }

  :nth-child(2) { // 이름
    width: 100%;
    padding: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #5f5f5f;
  }

  :nth-child(3) { // 삭제 아이콘
    width: auto;
    font-size: 2rem;
    color: #7a2020;
  }
}

@media screen and (max-width: 768px) { 
  & > td {
    padding: 7px;

    :nth-child(2) {  // 이름
      font-size: 1.1rem;
    }

    :nth-child(3) { // 삭제 아이콘
      font-size: 1.6rem;
    }
  }
} 
`

export const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70%;

@media screen and (max-width: 768px) { 
  width: 40px;
  height: 40px;
} 
`;