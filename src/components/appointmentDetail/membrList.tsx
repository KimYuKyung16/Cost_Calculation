/** 
 * 일정 상세 페이지 - 멤버 리스트
 * 
 * */  

import { useEffect, useState, useRef } from 'react';
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

  const testRef: any = useRef();
  const testRef2: any = useRef();

  console.log(testRef)


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

  let [fontSize, setFontSize] = useState<number>(1.4);

  let [memberNum, setMemberNum] = useState();
  let [totalCost, setTotalCost] = useState(0); // 총 비용
  let [eachCost, setEachCost] = useState(0); // 1인당 내야 하는 비용



  useEffect(() => {

    if (String(totalCost).length >= 10) {
      setFontSize(1.3);
    } else if (String(totalCost).length >= 15) {
      setFontSize(1.2);
    }
    
  }, [totalCost])










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
      <Main__Common_Expense size = {fontSize}>
        <div>
          <p><FontAwesomeIcon icon={faUsers}/> 총 비용:</p>
          <p><span>{totalCost.toLocaleString('ko-KR')}</span>원</p>
        </div>
        <div>
          <p><FontAwesomeIcon icon={faUser}/> 1인 지출 비용:</p>
          <p><span>{eachCost.toLocaleString('ko-KR')}</span>원</p>
        </div>
      </Main__Common_Expense>

      <hr />

      <h5>현재 인원</h5>
      <Main__Members>
          {
            memberList.map((x, index) => {
              if (index === 0) { // 본인 정보
                return ( 
                  <MyInfo>
                    <li>
                      <img src="/image/crown_icon.svg"/>
                      <MyProfile src={x.profile}/>
                      <p>{x.nickname}</p>
                    </li>
                    <li>
                      <List>
                        <li>총 지출비 <hr/> {x.totalCost.toLocaleString('ko-KR')} 원</li>
                        <li>더 내야하는 비용 <hr/> {x.lackCost.toLocaleString('ko-KR')} 원</li>
                        <li>받아야 하는 비용 <hr/> {x.excessCost.toLocaleString('ko-KR')} 원</li>
                      </List>
                    </li>
                  </MyInfo>
                )
              } else { // 본인을 제외한 멤버들의 정보
                return(
                  <MemberInfo>
                    <li>
                      <Profile src={x.profile}/>
                      <p>{x.nickname}</p>
                    </li>
                    <li>
                      <List>
                        <li>총 지출비 <hr/> {x.totalCost.toLocaleString('ko-KR')} 원</li>
                        <li>더 내야하는 비용 <hr/> {x.lackCost.toLocaleString('ko-KR')} 원</li>
                        <li>받아야 하는 비용 <hr/> {x.excessCost.toLocaleString('ko-KR')} 원</li>
                      </List>
                    </li>
                  </MemberInfo>
                )
              }
            })
          }
      </Main__Members>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
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

& hr {
  width: 100%;
  height: 1px;
  background-color : #cbcbcb;
  border: none;
}

& h5 {
  color: #c9c9c9;
  margin: 10px 0 10px 10px;
  font-size: 1.5rem;
}
`

interface fontsize {
  size: number;
}


/* 총 비용, 1인당 지출 비용 */
const Main__Common_Expense = styled.div`
font-size: 1.3rem;
color: #d8d8d8;

& > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 20px;
  
  & > p:nth-child(1) {
    font-weight: bold;
    padding-right: 10px;
  }

  & > p:nth-child(2) {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 5px;
  }

  & span {
    font-size: ${(props: fontsize) => props.size}rem;
    color: #ffffff;
  }
}
`

/* 멤버들 */
const Main__Members = styled.ul`

`

/* 내 정보 */
const MyInfo = styled.ul`
background-color: #6f6fae;
outline: 2px solid #fdfdfd;
margin: 10px;
display: flex;
flex-direction: row;
padding: 2%;

* {
  list-style: none;
}

& > li:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
  position: relative;
  padding: 10px;
  
  & > img:first-child {
    position: absolute;
    z-index: 1;
    top: 0;
  } 
}

& > li:last-child {
  display: flex;
  flex-direction: row;
  align-items: center;
}
`

const MemberInfo = styled.ul`
margin: 0 10px;
display: flex;
flex-direction: row;
padding: 2%; 
border-bottom: 0.5px solid #e6e6e6;

* {
  list-style: none;
}

& > li:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  padding: 10px;
}

& > li:last-child {
  display: flex;
  flex-direction: row;
  align-items: center;
}
`



const MyProfile = styled.img`
width: 60px;
height: 60px;
border-radius: 70px;
border: 1px solid #fdff90;
margin-bottom: 5px;

@media screen and (max-width: 768px) { 
  width: 50px;
  height: 50px;
}
`

const Profile = styled.img`
width: 55px;
height: 55px;
border-radius: 70px;
border: 1px solid #c5c5c5;
margin-bottom: 5px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
}
`

/* 지출 비용 */
const List= styled.ul`
color: #e6e6e6;

& > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  padding: 5px 0;
  white-space: nowrap;
  
  & > hr {
    height: 15px;
    width: 1px;
    background-color: #b5b9d4;
    margin: 0 5px;
  }
}
`

export default AppointmentMemberList;