import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { appointmentListActions } from '../redux/modules/reducer/appointmentListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

import axios from 'axios';
 


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  /* height: 100%; */
  /* padding: 1% 3%; */
  box-sizing: border-box;  
  /* overflow: auto;  */
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
`

const Main__List = styled.table`
  /* background-color: #7e4a4a; */
  /* table-layout:fixed;  */
  width: 100%;
  border-spacing: 0 15px;
  border-collapse: collapse;

  * {
    /* padding: 1% 2%; */
    
    & tr {
      width: 100%;
      border-bottom: 1px solid #c9c9c9;
      /* background-color: #191a68; */
      
    }

    & td {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.2em;
      width: 100%;
      padding: 0 3%;
      background-color: red;
      box-sizing: border-box;

      & p {
        color: #322c59;

        & span {
          color: #4b4b74;
          padding-left: 10px;
          font-weight: 600;
        }
      }

    }

    & td:nth-child(1) {
      /* width: 60%; */
      /* background-color: #6f70a8; */
    }

    /* & td:nth-child(2) {
      width: 30px;
      text-align: center;
      background-color: #6549b9;
      border-radius: 10px;
      color: white;
      font-weight: bold;
    } */

   
  }
`
const Main__List__Members = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  background-color: #44466b;
  border-radius: 10px;
  /* height: 100%; */
  position: relative;
  width: 10%;
  padding-bottom: 10%;
  /* overflow: hidden; */

  /* &::after {
    display: block;
    content: "";
    padding-bottom: 10%;
  } */

  & div {
    position: relative;
    width: 100%;
    background-color: aqua;
    padding-bottom: 100%;
  }

  & div::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }

  & img {
    position: absolute;
    width: 45%;
    height: 45%;
    border-radius: 10px;
  }

  

`

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
    <Container>
      <Main>
        <Main__List>
          <tbody>
            {
              appointmentList.map((x, index) => {
                return(
                  <tr onClick={()=>{navigate('/appointment/' + x.num)}} key={index}>
                    <td>
                      <p>
                        {x.calculate_name}
                        <span>{x.members.length}</span>
                      </p>       
                      <Main__List__Members>
                          {
                            x.members.map((member: { id: string, nickname:string, profile: string }, index: any) => {
                              return(
                                <div>
                                  <img src={member.profile}/>
                                </div>
                              )
                            })
                          }
                      </Main__List__Members>
                    </td>
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

export default AppointmentList;