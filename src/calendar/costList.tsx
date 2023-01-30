import { useEffect, useRef, useState } from 'react';

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
  box-sizing: border-box;  
  /* background-color: #0e3535; */
`

const Header = styled.div`
  height: 10%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  height: 90%;
  box-sizing: border-box;
  overflow: auto; // 화면을 넘어가면 스크롤이 되도록

  /* -ms-overflow-style: none;
  scrollbar-width: none; */

  // 스크롤바 안보이게 하기
  /* &::-webkit-scrollbar {
    display: none;
  } */
`

const Main__List = styled.table`
  background-color: #ffffff;
  /* table-layout:fixed;  */
  width: 100%;
  height: 100%;
  border-spacing: 10px;
  border-collapse: separate; 
  box-sizing: border-box;

  * {
    padding: 1% 2%;

    & td:nth-child(1) {
      width: 60%;
      background-color: #dddddd;
    }

    & td:nth-child(2) {
      /* width: 20%; */
      text-align: center;
      background-color: #6549b9;
      border-radius: 10px;
      color: white;
      font-weight: bold;
    }

    & td:nth-child(3) {
      /* width: 20%; */
      text-align: right;
      background-color: #6549b9;
      border-radius: 10px;
      color: #fffc60;
      font-weight: bold;
      font-size: larger;
    }
  }

`

type Props = {
  num: string|undefined;
}

function CostList(props: Props) {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요

  const dispatch = useAppDispatch();

  const costList = useAppSelector(state => state.cost); // 멤버 리스트
  console.log(costList.list)

  const options: any = {
    root: document.querySelector('.main'), // .container class를 가진 엘리먼트를 root로 설정. null일 경우 브라우저 viewport
    rootMargin: '10px', // rootMargin을 '10px 10px 10px 10px'로 설정
    threshold: [0, 0.5, 1] // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
  }

  // let observer = new IntersectionObserver(loading, options);

  // // IntersectionObserver 생성
  // const io = new IntersectionObserver((entries, observer) => {
  //   // IntersectionObserverEntry 객체 리스트와 observer 본인(self)를 받음
  //   // 동작을 원하는 것 작성
  //   entries.forEach(entry => {
  //     // entry와 observer 출력
  //     console.log('entry:', entry);
  //     console.log('observer:', observer);
  //   })
  // }, options)


  // function loading() {
  //   console.log('loading중');
  // }

  // io.observe(options.root);

  // console.log(io);

  interface costListInterface {
    title: string;
    cost: string;
    payer: string;
  }

  let [costList2, setCostList2] = useState<costListInterface[]>([]);

  function costListPrint() {
    axios.get('http://localhost:6001/costlist', {
      params: {
        num: props.num
      }
    })
    .then(function (response) { 
      console.log(response.data);
      setCostList2(response.data);
      // dispatch(costActions.setcostList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  console.log(costList2)

  useEffect(() => { costListPrint(); }, [])

  return(
    <Container>
      <Header>
        <h1>비용 정산 리스트</h1>
      </Header>

      <Main>
        <Main__List>
          <tbody>
            {
              costList2.map((x, index) => {
                return(
                  <tr>
                    <td className='test1'>{x.title}</td>
                    <td className='test2'>{x.payer}</td>
                    <td className='test3'>{x.cost} 원</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__List>
      </Main>
    </Container>
  )
}

export default CostList;