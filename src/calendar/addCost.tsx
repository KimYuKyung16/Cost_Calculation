import { useEffect, useRef } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
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
  
  const memberList = useAppSelector(state => state.memberList); // 멤버 리스트
  const cost = useAppSelector(state => state.cost); // 비용 리스트
  console.log('cost:',cost);

  const dispatch = useAppDispatch();

  // 변경된 제목 저장
  let onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => { 
    dispatch(costActions.setcostTitle(e.target.value)) 
  }; 

  // 변경된 지불인 닉네임 저장
  let onChangePayer = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    dispatch(costActions.setcostID(e.target.value)); 
    dispatch(costActions.setcostPayer(e.target.options[e.target.selectedIndex].text)); 
  }; 

  // 변경된 비용 저장
  let onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => { 
    dispatch(costActions.setcostCost(e.target.value)) 
  }; 

  // 변경된 내용 저장
  let onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    dispatch(costActions.setcostContent(e.target.value)) 
  }; 

  function save_process(){
    if (cost.title && cost.cost && cost.content && cost.payer){
      const contents_send_val = {
        calculateListNum: params.num,
        title: cost.title,
        payer: cost.payer,
        id: cost.id,
        cost: cost.cost,
        content: cost.content,
        receipt: cost.receipt
      }
      axios.post('http://localhost:6001/cost', { // 서버로 post 요청
        contents_send_val
      })
      .then(function (response) { // 서버에서 응답이 왔을 때
        if (response.data.status === 'success') {
          navigate('/appointment/' + params.num);
        } else {
          alert("저장에 실패했습니다.");
        }  
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      alert("작성되지 않은 부분이 있습니다.")
    }
    
  }


  return(
    <Main>
      <Main__title>
        <input onChange={onChangeTitle} type="text" placeholder='비용 처리 제목'/>
        <select onChange={onChangePayer} value={cost.id}>
          {
            memberList.map((x, index) => {
              return(
                <option key={index} value={x.id}>{x.nickname}</option>
              )
            })
          }        
        </select>
      </Main__title>
      <Main__cost>
        <input onChange={onChangeCost}  type="text" placeholder='지출 비용: 숫자' />
      </Main__cost>

      <Main__contents>
        <Main__contents__content>
          <textarea onChange={onChangeContent}></textarea>
        </Main__contents__content>

        <Main__contents__receipt>
          <img width="200" height="200" src="/image/receipt_default.png" />
          <input type="file"/>
        </Main__contents__receipt>
      </Main__contents>

      <input onClick={save_process} type="button" value="저장"/>

    </Main>
  )
}

export default AddCost;