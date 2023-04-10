import styled from "styled-components"; 

interface Type_Props {
  type: string | undefined;
}

export const Conatiner = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
height: 100%;
background-color: #322c58;

& > ul {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: 0;
  padding-left: 0;
  list-style: none;

  & > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 20%;
    padding: 20px;
    color: #b7b6d6;
    font-weight: bold;
    font-size: 2rem;
    cursor: pointer;
  }

  & li:nth-child(${(props: Type_Props) => props.type}) {
    background-color : #44466b;
    color : white;
  }

  & li:hover{  
    background-color : #44466b;
    color : white;
  }
}

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  align-items: flex-end;

  & > ul {
    width: auto;
    align-items: center;
    flex-direction: row;
    padding: 0 10px;
    gap: 5px;

    & > li {
      height: 50%;
      font-size: 1.1rem;
      padding: 10px;
      border-radius: 12px;

      & > p:nth-child(2) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 600px) { 
  display: block;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;

  & > ul {
    flex-direction: column;
    width: 100%;
    height: 150px;
    padding: 0;
    gap: 0;

    & > li {
      width: 100%;
      height: 25%;
      padding: 10px 20px;
      border-radius: 0;
      font-size: 1.2rem;

    
      & > p:nth-child(2) {
        display: block;
      }
    }
  }
}
`
