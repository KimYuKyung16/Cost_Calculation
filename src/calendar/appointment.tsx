import { useEffect, useRef, useState } from 'react';

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

const Table = styled.table`
  border-collapse: collapse;
  padding: 10px;
  margin: 0 10px;
  /* background-color: aqua; */

  & tr {
    border-bottom: 0.5px solid #ffffff;
    display: flex;

    &:last-child{
      border-bottom: none;
    }
  }

  & td {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;

    &:nth-child(1) {
      /* width: 20%; */
    }
    
    &:nth-child(2) {
      font-weight: bold;
      width: 30%;
      /* background-color: beige; */
      padding-left: 10px;
    }

    &:nth-child(3) {
      /* width: 100%; */
      text-align: right;
    }

  }
`

const List = styled.ul`
  list-style: none;
  padding-left: 0;

  & > li {
    font-size: small;
    padding: 5px 0;
  }
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

  let [memberNum, setMemberNum] = useState();
  let [totalCost, setTotalCost] = useState(''); // 총 비용
  let [eachCost, setEachCost] = useState(''); // 1인당 내야 하는 비용


  const member_List = async () => {
    try {
      let member = await axios.get('http://localhost:6001/test', {
        params: {
          num: params.num
        }
      })
      setMemberNum(member.data.length);
      dispatch(memberListActions.setInitialMemberList(member.data));
      return member.data.length; // 총 인원
    } catch(e) {
      console.log(e);
    }
  }

  // 전체적인 비용 API로 가져오기
  const sum_Of_Money = async () => {
    const memberNum = await member_List(); // promise 형태라서 await
    try {
      let money = await axios.get('http://localhost:6001/sum', {
        params: {
          num: params.num,
          memberNum: memberNum 
        }
      })
      console.log(money.data);
      setTotalCost(money.data.sumCost); // 총 비용 설정
      setEachCost(money.data.eachCost); // 1인당 내야 하는 비용 설정
    } catch(e) {
      console.log(e)
    }
  }



  useEffect(()=> {sum_Of_Money();}, []);

  return(
    <Container>
      <Test>
        <div>
          <p>총 비용: {totalCost}</p>
          <p>1인당 내야 하는 비용: {eachCost}</p>
        </div>

        <Table>
          <tbody>
            {
              memberList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><Profile src={x.profile}/></td>
                    <td>{x.nickname}</td>
                    <td>
                      <List>
                        <li>총 지출비: </li>
                        <li>더 내야하는 비용: </li>
                        <li>받아야 하는 비용: </li>
                      </List>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <div>
          <input onClick={()=>{navigate('cost')}} type="button" value="비용 등록"/>
        </div>
      </Test>

      <CostList num={num} />
    </Container>
  )
}

export default Appointment;