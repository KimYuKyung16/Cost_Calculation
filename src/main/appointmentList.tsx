import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { appointmentListActions } from '../redux/modules/reducer/appointmentListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

import axios from 'axios';
import { memberListActions } from '../redux/modules/reducer/memberListReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
 


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  /* height: 100%; */
  /* padding: 2% 5%; */
  box-sizing: border-box;  
  /* overflow: auto;  */
`

const Main = styled.div`
  position: relative
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
      border-bottom: 1px solid #e3e3e3;
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
      /* background-color: red; */
      box-sizing: border-box;

      & p {
        color: #322c59;

        & span:nth-child(2) {
          color: #3c3c3c;
          padding-left: 10px;
          font-weight: bold;
        }

        & span:nth-child(3) {
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
  border-radius: 10px;
  width: 10%;
  max-width: 70px;
  max-height: 70px;

  & div {
    padding-top: 0%;
    max-width: 50px;
    max-height: 50px;

      & div {
        display: flex;
        flex-direction: row;
        flex-flow: wrap-reverse;
        justify-content: center;
        align-items: center;

        width: 100%;
        padding-top: 0%;
        max-width: 70px;
        max-height: 70px;
        top: 0;


        

        & div {
          width: 50%;
          padding-top: 50%;
          max-width: 30px;
          max-height: 30px; 
          position: relative;
          border-radius: 10px;
          background-color: #000000;

          & img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding-top: 0%;
            position: absolute;
            top: 0;
            border: 1px solid #bfbfbf;
          } 
        }
      }
  }
`

const Star = styled.img`
  width: 20px;
  height: 20px;
  /* padding-right: 10px; */
`

const Main__Btn = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
background-color: #322c5a;
color: #ffffff;
width: 60px;
height: 60px;
bottom: 10%;
right: 10%;
font-size: 3em;
`

interface State_Props {
  state: string | undefined;
}

const Main__State = styled.div`
background-color: ${(props: State_Props) => props.state === 'true' ? '#72bc93' : '#b6b7d5' };
/* background-color: #72bc93; */
color: #ffffff;
padding: 3px 10px;
`


function AppointmentList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // dispatch(appointmentListActions.setInitialAppointmentList([{
  //   num: 1,
  //   id: 'kyk',
  //   calculate_name: 'kykname',
  //   members: [{id: 'test', nickname: 'teello', profile: 'ss'}],
  //   bookmark: 'test'
  // }]));

  const appointmentList = useAppSelector(state => state.appointmentList);
  const appointmentListType = useAppSelector(state => state.appoinmentListType);
  
  const appointmentListUp = async () => {
    try {
      let list = await axios.get('http://localhost:6001/appointmentList', {
        params: {
          type: appointmentListType.type
        }
      })
      dispatch(appointmentListActions.setInitialAppointmentList(list.data));
    } catch(e) {
      console.log(e);
    }
  }


  const bookmark = async (index: number, num: number) => {
    let bookmark = appointmentList[index].bookmark;
    if (bookmark === 'true') bookmark = 'false'
    else bookmark = 'true'

    console.log(appointmentList)

    dispatch(appointmentListActions.setBookmark({index: index, bookmark: bookmark}));

    let setBookmark = await axios.put(`http://localhost:6001/appointmentList/bookmark/${num}`, {
      data: {
        bookmark: bookmark
      }
    });

    console.log(setBookmark)
  }


  const componentChange = () => {
    if (!appointmentList.length) {
      return (
        <>
          <p>일정이 없습니다.</p>
          <p>새로운 일정을 추가해보세요.</p>
        </>
      )
    } else {
      return (
        <Main__List>
          <tbody>
            {
              appointmentList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td>

                      <p>
                        <Star onClick={()=>{bookmark(index, x.num)}} src={appointmentList[index].bookmark === 'true'? 'image/star.png' : 'image/empty_star.png'}  />
                        <span onClick={()=>{navigate('/appointment/' + x.num)}}>{x.calculate_name}</span>
                        <span>{x.members.length}</span>
                      </p>   

                      <Main__List__Members>
                        <div>
                          <div> {/* 3개의 프로필을 모아둔 div*/}
                            {
                              x.members.map((member: { id: string, nickname:string, profile: string }, index: any) => {
                                return(
                                  <div key={index}>
                                    <img src={member.profile}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </Main__List__Members>

                      <p>{x.date}</p>
                      <Main__State state={x.state}>
                        {x.state}
                      </Main__State>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__List>
      )
    }
  }




  useEffect(() => { appointmentListUp(); }, [appointmentListType.type])


  return(
    <Container>
      <Main>
        {componentChange()}
        <Main__Btn><FontAwesomeIcon onClick={()=>{navigate('/appointment')}} icon={faPlus}/></Main__Btn>
        {/* <input  type="button" value="약속 추가하기"/> */}
      </Main>
    </Container>
  )
}

export default AppointmentList;