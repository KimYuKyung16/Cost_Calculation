import { useEffect, useMemo, useRef, useState } from 'react';

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { costActions } from '../../../redux/modules/reducer/costReducer'

import Header from './header';

type Props = {
  num: string|undefined;
}

function CostList(props: Props) {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  interface costListInterface {
    title: string;
    cost: string;
    payer: string;
  }

  const loadRef:any = useRef(); 

  let [costList, setCostList] = useState<costListInterface[]>([]); // 정산 리스트
  let [totalPageCount, setTotalPageCount] = useState(); // 총 정산 페이지 개수
  let [visible, setVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  let [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  
  /* 정산 리스트 출력 */
  const costListPrint = async () => {
    try {
      let list = await  axios.get('http://localhost:6001/costlist', {
        params: {
          num: props.num,
          current_page: currentPage
        }
      })
      setTotalPageCount(list.data.totalPageCount); // 전체 페이지
      setCostList(state => [...state, ...list.data.list]); // 정산 리스트
    } catch(e) {
      console.log(e);
    }
  }

  /* 지출 내역이 있을 경우 없을 경우의 컴포넌트 변화 */
  const componentChange = () => {
    if (!costList.length) { // 지출 내역이 없을 경우
      return (
        <Main__List_none>
          <p>지출 내역이 없습니다.</p>
          <p>지출 내역을 추가해보세요.</p>
        </Main__List_none>
      )
    } else { // 지출 내역이 있을 경우
      return (
        <Main__List>
          <tbody>
            {
              costList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td>{x.title}</td>
                    <td>{x.payer}</td>
                    <td>{x.cost.toLocaleString()} 원</td>
                  </tr>
                )
              })
            }
          </tbody>
          <Loading ref={loadRef} visible={visible}>
            <tr>
              <td><LoadingImage src='/image/loading_icon.gif'/></td>
            </tr>
          </Loading> 
        </Main__List>
      )
    }
  }

  const callback = (entries: any) => {
    const [entry] = entries;
    // isIntersecting: 교차 여부 결과값(true or false)
    if (entry.isIntersecting && totalPageCount !== currentPage) {
      setCurrentPage(currentPage => currentPage+1); // 페이지 넘기기
    } 
    // 현재 페이지가 가장 마지막 페이지일 경우
    if (totalPageCount === currentPage) setVisible(false); // 로딩화면X
    else setVisible(true); // 로딩화면O
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options); 
    const target = loadRef.current;  

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    }
  }, [loadRef, options, costList])
  
  useEffect(() => { costListPrint(); }, [currentPage])

  return(
    <Container>
        <Header></Header>
        <Main>
          { componentChange() }
        </Main>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
background-color: #e4e4e4;
padding: 0 3% 1% 3%;
overflow: auto;

@media screen and (max-width: 768px) { 
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
`

const Main = styled.div`
width: 100%;
height: 100%;
`

const Main__List_none = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 60px;
font-size: 1.4rem;
gap: 10px;

@media screen and (max-width: 768px) { 
  font-size: 1.2rem;
  gap: 8px;
  padding-bottom: 80px;
} 
`

const Main__List = styled.table`
table-layout: fixed;
border-collapse: separate;
border-spacing: 5px;
width: 100%;
font-size: 1.3em;

& > tbody > tr {
  width: 100%;
  /* height: 50px; */
  font-size: 1.3rem;

  & > td {
    padding: 10px;
    vertical-align: middle;
  }

  & > td:nth-child(1) { // 정산 이름
    width: 60%;
    background-color: #ffffff;
    border: 2px solid #b4b8d1;
    border-radius: 5px;
    overflow: hidden;  
    white-space: nowrap;
    text-overflow: ellipsis; // 말줄임
  }

  & > td:nth-child(2) { // 정산자
    text-align: center;
    width: 100px;
    background-color: #c2c2c2;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    white-space: nowrap;
  }

  & > td:nth-child(3) { // 정산 가격
    text-align: right;
    width: 100px;
    background-color: #322c58;
    border-radius: 5px;
    color: #fffc60;
    font-weight: bold;
    white-space: nowrap;
  }
}

@media screen and (max-width: 768px) { 
  & > tbody > tr {
  width: 100%;
  /* height: 50px; */
  font-size: 1.1rem;

  & > td {
    padding: 5px;
  }

  & > td:nth-child(1) { // 정산 이름
    width: 60%;
    border: 1px solid #b4b8d1;
  }

  & > td:nth-child(2) { // 정산자
    width: 80px;
  }

  & > td:nth-child(3) { // 정산 가격
    width: 80px;
  }
}
} 
`
interface Loading_Props {
  visible: boolean | undefined | null;
}

/* 로딩 영역 */
const Loading = styled.tfoot`
display: ${(props: Loading_Props) => props.visible ? 'block' : 'none' };
width: 100%;
height: 100%;
padding: 0;

* {
  padding: 0;
}

& > tr {
  display: flex;
  width: 100%;
}
& td {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
`

const LoadingImage = styled.img`
width: 100px;
height: 100px;
`

export default CostList;