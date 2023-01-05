import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { appointmentListActions } from '../redux/modules/reducer/appointmentListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

import axios from 'axios';
 

function AppointmentList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const appointmentList = useAppSelector(state => state.appointmentList);

  function appointmentListUp() {
    axios.get('http://localhost:6001/appointmentList')
    .then(function (response) { 
      console.log(response); 
      dispatch(appointmentListActions.setInitialAppointmentList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => { appointmentListUp(); }, [])


  return(
    <>
      <tbody>
        {
          appointmentList.map((x, index) => {
            return(
              <tr onClick={()=>{navigate('/appointment/' + x.num)}} key={index}>
                <td>{x.calculate_name}</td>
                <td>{x.members}</td>
              </tr>
            )
          })
        }
      </tbody>
    </>
  )
}

export default AppointmentList;