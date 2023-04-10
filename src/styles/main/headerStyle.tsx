import styled from 'styled-components'; 

export const Conatiner = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px 20px;

& > h2 {
  font-size: 2.2rem;
}

@media screen and (max-width: 768px) { 
  & > h2 {
    font-size: 1.9rem;
  }
} 
`

export const Conainer__Info = styled.div`
position: relative;

& > p { // 안내 아이콘
  font-size: 2rem;
  color: #6f6fad;
}

@media screen and (max-width: 768px) { 
  & >  p { // 안내 아이콘
    font-size: 1.7rem;
  }
} 
`

interface Info_Props {
  visible: string | undefined;
}

/* 안내 문구창 */
export const Info = styled.div`
display: ${(props: Info_Props) => props.visible };
width: fit-content;
height: auto;
background-color: #e7e7e7;
color: #322c58;
font-size: 1.4rem;
font-weight: bold;
letter-spacing: -0.25px;
white-space: nowrap;
border: 1px solid #322c58;
border-radius: 5px;
padding: 10px 20px;
position: absolute;
top: 45px;
right: 0;
z-index: 2;

&::after {
  content: '';
  display: block;
  width: 0;
  border-color: #e7e7e7 transparent;
  border-style: solid;
  border-width: 0px 6px 8px 6.5px;
  position: absolute;
  top: -7px;
  right: 5px;
  z-index: 1;
}

&::before {
  content: '';
  display: block;
  width: 0;
  border-color: #322c58 transparent;
  border-style: solid;
  border-width: 0 6px 8px 7px;
  position: absolute;
  top: -8.2px;
  right: 5px;
  z-index: 0;
}

@media screen and (max-width: 768px) {
  font-size: 1.2rem;
  padding: 5px 10px;
  top: 35px;
} 
`