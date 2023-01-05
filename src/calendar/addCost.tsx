import { useEffect, useRef } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

const Main = styled.div`
  display: flex;
  flex-direction: column;
`

const Main__title = styled.div`
  display: flex;
  flex-direction: row;
`

const Main__cost = styled.div`

`

const Main__contents = styled.div`
  display: flex;
  flex-direction: row;
`

const Main__contents__content = styled.div`
  display: flex;
  flex-direction: row;
`

const Main__contents__receipt = styled.div`
  display: flex;
  flex-direction: column;
`


function AddCost() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  
  let params = useParams();
  console.log(params.num); // 리스트 번호

  return(
    <Main>
      <Main__title>
        <input type="text" placeholder='비용 처리 제목'/>
        <select value='name1'>
          <option value='name1'>test이름</option>
          <option value='name2'>test이름2</option>
          <option value='name3'>test이름3</option>
        </select>
      </Main__title>
      <Main__cost>
        <input type="text" placeholder='지출 비용: 숫자' />
      </Main__cost>

      <Main__contents>
        <Main__contents__content>
          <textarea></textarea>
        </Main__contents__content>

        <Main__contents__receipt>
          <img width="200" height="200" src="/image/receipt_default.png" />
          <input type="file"/>
        </Main__contents__receipt>
      </Main__contents>
    </Main>
  )
}

export default AddCost;