import { useEffect, useRef } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js


function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();

  let params = useParams();
  console.log(params.num); // 리스트 번호

  function test() {
    axios.get('http://localhost:6001/test', {
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

  useEffect(()=> {test()}, []);

  return(
    <>
      <div>
        <input onClick={()=>{navigate('cost')}} type="button" value="비용 등록"/>
      </div>
    </>
  )
}

export default Appointment;