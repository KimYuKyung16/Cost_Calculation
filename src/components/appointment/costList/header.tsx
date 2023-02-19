import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../../../redux/modules/reducer/costReducer'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import axios from 'axios'; 
import styled from "styled-components";

function Header() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const memberList = useAppSelector(state => state.memberList); // 멤버 리스트
  const cost = useAppSelector(state => state.cost); // 비용 리스트

  // 변경된 지불인 닉네임 저장 : 나중에 변경해야함.
  const onChangePayer = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    dispatch(costActions.setcostID(e.target.value)); 
    dispatch(costActions.setcostPayer(e.target.options[e.target.selectedIndex].text)); 
  }; 
  
  return(
    <Main>
      <h2>🤑 지출 내역</h2>
      <div>  
        <SelectUser>
          <select onChange={onChangePayer} value={cost.id}>
            {
              memberList.map((x, index) => {
                return(
                  <option key={index} value={x.id}>{x.nickname}</option>
                )
              })
            }        
          </select>
        </SelectUser>
        <input onClick={ ()=>{navigate('cost')} } type="button" value="등록"/>
      </div>
    </Main>
  )
}

const Main = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
position: sticky;
top: 0;
width: 100%;
height: 50px;
background-color: #e4e4e4;
padding: 0 0 0 1vw;

& > div:nth-child(2) { // 멤버별 필터링, 지출 내역 등록 
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  height: 60%;
  max-width: 300px;

  & > input { // 지출 내역 등록 버튼
    width: 50%;
    height: 100%;
    border: none;
    background-color: #74ba97;
    color: #ffffff;
    font-weight: bold;
    margin-left: 5px;
    border-radius: 10px;
    cursor: pointer;
  }
}
`

/* 멤버 별 필터링 */
const SelectUser = styled.div` 
width: 50%;
height: 100%;
margin-right: 5px;

& > select {
  width: 100%;
  height: 100%;
  background-color: #d7d7d7;
  color: #322d59;
  border: 1px solid #bebebe;
  border-radius: 10px;
  cursor: pointer;
}
`

export default Header;