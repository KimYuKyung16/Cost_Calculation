import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons'; 

import { appointmentListTypeActions } from '../redux/modules/reducer/appointmentListReducer'
import { appointmentListTypeCountActions } from '../redux/modules/reducer/appointmentListReducer'
import { userInfoActions } from '../redux/modules/reducer/userInfoReducer';
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

interface Type_Props {
  type: string | undefined;
}

const Main__List = styled.div`
display: flex;
flex-direction: column;
/* align-items: center; */
justify-content: center;
width: 100%;
height: 40%;
/* background-color: #6b0285; */

& > ul {
  /* list-style:none; */
  display: flex;
  flex-direction: column;
  /* background-color: #bf8b46; */
  height: 100%;
  /* align-items: center; */
  /* justify-content: space-around; */
  padding-left: 0;

  & > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #b7b6d6;
    font-weight: bold;
    font-size: 20px;
    /* background-color: #b4b4b4; */
    /* padding: 10px; */
    height: 15%;
    padding: 5px 20px;
    cursor: pointer;
  }

  & li:nth-child(${(props: Type_Props) => props.type}) {
    background-color : #44466b;
    color : white;
  }

  & li:hover{  
    background-color : #44466b;
    color : white;
  }
}

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
/* display: none; */
align-items: flex-end;

& > ul {
  flex-direction: row;
  padding: 0 10px;

  & > li {
    font-size: 0.9em;
    padding: 10px 10px;

    & > p:nth-child(2) {
      display: none;
    }
  }
}

@media screen and (max-width: 600px) { 
display: none;
}
}
`


function AppointmentListType() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const dispatch = useAppDispatch();
  const appointmentListType = useAppSelector(state => state.appoinmentListType);
  const appointmentListTypeCount = useAppSelector(state => state.appoinmentListTypeCount);

  console.log(appointmentListType)
  console.log(appointmentListTypeCount)

  /* 타입별 리스트 개수 가져오기 */
  const AppointmentType_Count = async () => {
    try {
      let count = await axios.get('http://localhost:6001/appointmentList', {
        params: { type: 'count' }
      })
      console.log('count값:',count.data.countList)

      if (count.data.countList) {
        dispatch(appointmentListTypeCountActions.setInitialAppointmentListTypeCount(count.data.countList));
      }
    } catch(e) {
      console.log(e);
    }
  }

  const clickAppointmentType1 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType('1'));
  }

  const clickAppointmentType2 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType('2'));
  }

  const clickAppointmentType3 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType('3'));
  }

  const clickAppointmentType4 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType('4'));
  }

  useEffect(() => {
    AppointmentType_Count();
  }, [])


  return (
    <Main__List type={appointmentListType.type}>
      <ul>
        <li onClick={clickAppointmentType1}>
          <p># 전체 약속</p><p>{appointmentListTypeCount.length ? appointmentListTypeCount[0].count : 0}</p>
        </li>
        <li onClick={clickAppointmentType2}>
          <p># 정산중인 약속</p><p>{appointmentListTypeCount.length ? appointmentListTypeCount[1].count : 0}</p>
        </li>
        <li onClick={clickAppointmentType3}>
          <p># 정산 완료된 약속</p><p>{appointmentListTypeCount.length ? appointmentListTypeCount[2].count : 0}</p>
        </li>
        <li onClick={clickAppointmentType4}>
          <p># 즐겨찾기 약속</p><p>{appointmentListTypeCount.length ? appointmentListTypeCount[3].count : 0}</p>
        </li>
      </ul>
    </Main__List>
  )
}

export default AppointmentListType;