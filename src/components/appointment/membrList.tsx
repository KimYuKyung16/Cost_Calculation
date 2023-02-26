/** 
 * 일정 상세 페이지 - 멤버 리스트
 * 
 * */  

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios'; 
import styled from "styled-components"; 

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { memberListActions } from '../../redux/modules/reducer/memberListReducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUsers, faUser } from '@fortawesome/free-solid-svg-icons'; // 총 비용, 1인당 비용 아이콘

type Props = {
  num: string|undefined;
}

function AppointmentMemberList(props: Props) {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  let num: string|undefined = params.num;


  interface MemberListInterface {
    id: string; // 아이디
    nickname: string; // 닉네임 
    profile: string; // 프로필
    totalCost: number; // 총 지출비
    lackCost: number; // 더 내야하는 비용
    excessCost: number; // 받아야 하는 비용
  }

  const memberList2 = useAppSelector(state => state.memberList);
  let [memberList, setMemberList] = useState<MemberListInterface[]>([]);
  const userInfo = useAppSelector(state => state.userInfo);
 
  console.log(memberList)
  console.log(memberList2)

  let [memberNum, setMemberNum] = useState();
  let [totalCost, setTotalCost] = useState(0); // 총 비용
  let [eachCost, setEachCost] = useState(0); // 1인당 내야 하는 비용

  // 멤버 리스트 가져오기
  const member_List = async () => {
    try {
      let member = await axios.get('http://localhost:6001/memberList', {
        params: {
          num: params.num,
          // eachCost: eachCost
        }
      })
      setTotalCost(member.data.sumCost); // 총 비용 설정
      setEachCost(member.data.eachCost); // 1인당 내야 하는 비용 설정
      setMemberList(member.data.memberList)
      dispatch(memberListActions.setInitialMemberList(member.data.memberList));

      return member.data.length; // 총 인원
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(()=> { member_List() }, []);

  return(
    <Container>
      <Main>
        <Main__Common_Expense>
          <div>
            <p><FontAwesomeIcon icon={faUsers}/> 총 비용:</p>
            <p>{totalCost.toLocaleString('ko-KR')} 원</p>
          </div>
          <div>
            <p><FontAwesomeIcon icon={faUser}/> 1인당 지출 비용:</p>
            <p>{eachCost.toLocaleString('ko-KR')} 원</p>
          </div>
        </Main__Common_Expense>

        <hr />

        <h5>현재 인원</h5>
        <Main__Members>
          <tbody>
            {
              memberList.map((x, index) => {
                if (index === 0) { // 본인 정보
                  return ( 
                    <>
                    <MyInfo>
                      <tr key={index}>
                        <td><Profile src={x.profile}/></td>
                        <td>{x.nickname}</td>
                        <td>
                          <List>
                            <li>총 지출비: {x.totalCost.toLocaleString('ko-KR')} 원</li>
                            <li>더 내야하는 비용: {x.lackCost.toLocaleString('ko-KR')} 원</li>
                            <li>받아야 하는 비용: {x.excessCost.toLocaleString('ko-KR')} 원</li>
                          </List>
                        </td>
                      </tr>
                    </MyInfo>
                    </>
                  )
                } else { // 본인을 제외한 멤버들의 정보
                  return(
                    <tr key={index}>
                      <td>
                        <Profile src={x.profile}/>
                        <input type="button" value="송금" />
                      </td>
                      <td>{x.nickname}</td>
                      <td>
                        <List color={'white'}>
                          <li>총 지출비: {x.totalCost.toLocaleString('ko-KR')} 원</li>
                          <li>더 내야하는 비용: {x.lackCost.toLocaleString('ko-KR')} 원</li>
                          <li>받아야 하는 비용: {x.excessCost.toLocaleString('ko-KR')} 원</li>
                        </List>
                      </td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </Main__Members>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  background-color: #322c58;
  overflow: auto; 

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  } 
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  
  & hr {
    width: 100%;
    height: 1px;
    background-color : #cbcbcb;
    border: none;
  }

  & h5 {
    color: #c9c9c9;
    margin-left: 10px;
  }
`

/* 총 비용, 1인당 지출 비용 */
const Main__Common_Expense = styled.div`
  color: #d8d8d8;
  font-size: 0.9em;

  * {
    padding: 0;
    margin: 0;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0 20px;
    
    & > p:nth-child(1) {
      color: #ffffff;
      font-weight: bold;
    }
  }
`

/* 멤버들 */
const Main__Members = styled.table`
  border-collapse: collapse;
  margin: 0 10px;
  padding: 10px;

  & tr {
    display: flex;
    padding: 10px;
    border-bottom: 0.5px solid #6c6c6c;

    &:last-child{
      border-bottom: none;
    }
  }

  & td {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #dedede;

    &:nth-child(1) { // 송금 버튼
      display: flex;
      flex-direction: column;
      white-space: nowrap;

      & > input {
        background-color: #812d50;
        border: none;
        color: white;
        margin-top: 10px;
        padding: 3px 20px;
        cursor: pointer;
      }
    }
    
    &:nth-child(2) { // 멤버 이름
      font-weight: bold;
      width: 30%;
      padding-left: 10px;
      padding-right: 20px;
    }

    &:nth-child(3) { // 멤버별 계산된 비용
      text-align: left;
    }

  }
`

/* 내 정보 */
const MyInfo = styled.div`
  background-color: #6f6fae;
  outline: 3px solid #fdfdfd;
`

const Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 70%;
`

/* 지출 비용 */
const List= styled.ul`
  list-style: none;
  padding-left: 0;

  & > li {
    font-size: 0.8em;
    padding: 5px 0;
  }
`

export default AppointmentMemberList;