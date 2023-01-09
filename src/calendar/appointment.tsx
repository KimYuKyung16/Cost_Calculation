import { useEffect, useRef } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import CostList from './costList';

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: #6549b9; */
`

const Test = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #6549b9;
  width: 40%;
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  let num: string|undefined = params.num;
  console.log(typeof(params.num)); // 리스트 번호

  const memberList = useAppSelector(state => state.memberList);
  console.log(memberList)


  function member_List() {
    axios.get('http://localhost:6001/test', {
      params: {
        num: params.num
      }
    })
    .then(function (response) { 
      console.log(response.data);
      dispatch(memberListActions.setInitialMemberList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function sum_Of_Money() {
    axios.get('http://localhost:6001/sum', {
      params: {
        num: params.num
      }
    })
    .then(function (response) { 
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  useEffect(()=> {member_List(); sum_Of_Money();}, []);

  return(
    <Container>
      <Test>
        <div>
          <p>총 비용:</p>
          <p>1인당 내야 하는 비용:</p>
        </div>

        <div>
          <tbody>
            {
              memberList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><Profile src={x.profile}/>{x.nickname}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </div>

        <div>
          <input onClick={()=>{navigate('cost')}} type="button" value="비용 등록"/>
        </div>
      </Test>

      <CostList num={num} />
    </Container>
  )
}

export default Appointment;