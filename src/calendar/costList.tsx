import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1% 3%;
  overflow: auto;
  background-color: #e4e4e4;

   /* -ms-overflow-style: none;
  scrollbar-width: none;

  // 스크롤바 안보이게 하기
  &::-webkit-scrollbar {
    display: none;
  } */
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%;
  height: 90%; */
  /* overflow: auto; // 화면을 넘어가면 스크롤이 되도록 */

  /* -ms-overflow-style: none;
  scrollbar-width: none;

  // 스크롤바 안보이게 하기
  &::-webkit-scrollbar {
    display: none;
  } */
`

const Main__List = styled.table`
  /* table-layout:fixed;  */
  width: 100%;
  /* height: auto; */
  /* border-spacing: 5px; */
  border-collapse: collapse;
  font-size: 0.9em;
  white-space: nowrap; 
  table-layout: fixed;

  & > tbody > tr {
    height: 50px;
    width: 100%;
    display: flex;
    margin: 5px 0;

    & > td {
      padding: 1% 2%;
      /* display: flex; */
      /* flex-direction: row; */
      /* align-items: center; */
    }

    & > td:nth-child(1) {
      vertical-align: middle;
      width: 60%;
      background-color: #ffffff;
      border: 2px solid #b4b8d1;
      border-radius: 5px;
      overflow: hidden;  
      text-overflow: ellipsis;  
      /* white-space: nowrap;   */
    }

    & > td:nth-child(2) {
      /* width: 20%; */
      /* text-align: center; */
      justify-content: center;
      background-color: #322c58;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      width: 20%;
      margin: 0 5px;
    }

    & > td:nth-child(3) {
      /* width: 20%; */
      justify-content: flex-end;
      text-align: right;
      background-color: #322c58;
      border-radius: 5px;
      color: #fffc60;
      font-weight: bold;
      /* font-size: larger; */
      width: 20%;
    }
  }



`

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

  let [costList, setCostList] = useState<costListInterface[]>([]); // 정산 리스트
  let [totalPageCount, setTotalPageCount] = useState(); // 총 정산 페이지 개수
  let [visible, setVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  let [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  
  const loadRef:any = useRef(); 

  /* 정산 리스트 출력 */
  const costListPrint = async () => {
    try {
      let list = await  axios.get('http://localhost:6001/costlist', {
        params: {
          num: props.num,
          current_page: currentPage
        }
      })
      console.log(list.data.totalPageCount);
      setTotalPageCount(list.data.totalPageCount);
      setCostList(state => [...state, ...list.data.list]);
    } catch(e) {
      console.log(e);
    }
  }

  const componentChange = () => {
    if (!costList.length) {
      return (
        <>
          <p>일정이 없습니다.</p>
          <p>새로운 일정을 추가해보세요.</p>
        </>
      )
    } else {
      return (
        <>
          <tbody>
            {
              costList.map((x, index) => {
                return(
                  <tr>
                    <td>{x.title}</td>
                    <td>{x.payer}</td>
                    <td>{x.cost} 원</td>
                  </tr>
                )
              })
            }
          </tbody>
          <TargetTest ref={loadRef} visible={visible} >
            <tr>
              <td><LoadingImage src='/image/loading_icon.gif'/></td>
            </tr>
          </TargetTest> 
        </>
      )
    }
  }




  let callback = (entries: any) => {
    const [entry] = entries;

    // isIntersecting: 교차 여부 결과값(true or false)
    console.log(entry.isIntersecting)
    if (entry.isIntersecting && totalPageCount !== currentPage) {
      setCurrentPage(currentPage => currentPage+1);
    } 

    // 현재 페이지가 가장 마지막 페이지라면
    if (totalPageCount === currentPage) setVisible(false); // 로딩화면 안보이게
    else setVisible(true); // 로딩화면 보이게

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
      <Main>
        <Main__List>
          {componentChange()}
        </Main__List>
      </Main>
    </Container>
  )
}

export default CostList;

const LoadingImage = styled.img`
  width: 100px;
  height: 100px;
`
interface Loading_Props {
  visible: boolean | undefined | null;
}

const TargetTest = styled.tfoot`
  padding: 0;
  height: 100%;
  width: 100%;
  display: ${(props: Loading_Props) => props.visible ? 'block' : 'none' };

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