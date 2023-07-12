import styled from "styled-components";

export const Header_ = styled.header`
display: flex;
align-items: center;
flex-direction: row;
height: 100%;
background-color: #322c58;
box-sizing: border-box;
padding-left: 10px;
gap: 10px;

& { 
  color: white;
  font-size: 1.2em;
}

& > img { // 뒤로가기 아이콘
  height: 40%;
}

& > p:nth-child(2) { // 햄버거바 아이콘
  display: none;
  font-size: 1.7rem;
}

& > p:last-child { // 메뉴 아이콘
  padding-right: 15px;
}

@media screen and (max-width: 768px) { 
  padding: 0;

  & > img { // 뒤로가기 아이콘
    padding-left: 10px;
  }

  & > p:nth-child(2) { // 햄버거바 아이콘
    display: block;
  }
}
`

/* 정산 이름 */
export const Header__title = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
height: 100%;

& img { // 로고 이미지
  height: 50%;
}

& p { // 정산 이름
  padding-left: 5px;
  font-size: 1.2rem;
}
`

/* 정산 메뉴 */
export const Header__Menu = styled.div`
display: flex;
flex-direction: column;
position: relative;


& > p { // 메뉴 아이콘
  padding-right: 15px;
}
`

interface Visible_Props {
  visible: string | undefined;
}

/* 메뉴 */
export const Menu = styled.div`
display: ${(props: Visible_Props) => props.visible };
width: 200px;
background-color: #ffffff;
padding: 0;
border: none;
border-radius: 10px;
overflow: hidden;
box-shadow: 0 5px 10px rgba(59, 59, 59, 0.8);
position: absolute;
top: 35px;
right: 10px;
z-index: 3;

* {
  padding: 0;
  margin: 0;
}

& > ul {
  list-style: none;
  font-size: 1rem;
  
  & > li {
    text-align: center;
    padding: 10px;
    cursor: pointer;
  }

  & > li:nth-child(1) {
    color: #6d6d6d;

    &:hover {
      font-weight: bold;
    }
  }

  & > li:nth-child(2) {
    background-color: #b02020;

    &:hover {
      background-color: #ce2525;
      font-weight: bold;
    }
  }
}
`