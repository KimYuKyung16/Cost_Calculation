import { useEffect, useRef } from 'react';

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
  /* background-color: #d2d2d2; */
  width: 100vw;
  height: 100vh;
  padding: 1% 3%;
  box-sizing: border-box;
`

const Main__List = styled.table`
  /* background-color: #ffffff; */
  /* table-layout:fixed;  */
  width: 100%;
  border-spacing: 10px;
  border-collapse: separate;

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

  function costListPrint() {
    axios.get('http://localhost:6001/costlist', {
      params: {
        num: props.num
      }
    })
    .then(function (response) { 
      console.log(response.data);
      dispatch(costActions.setcostList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => { costListPrint(); }, [])

  return(
    <Container>
      <h1>비용 정산 리스트</h1>
      
      <Main__List>
        <tbody>
          {
            costList.list.map((x, index) => {
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
    </Container>
  )
}

export default CostList;