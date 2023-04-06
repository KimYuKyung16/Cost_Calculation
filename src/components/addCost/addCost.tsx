import { useEffect, useRef, useState } from 'react';
import { addCost } from "../../apis/api/cost"; // API


import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../../redux/modules/reducer/costReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


import axios from 'axios'; 
import styled from "styled-components"; // styled in js
import { validateHeaderValue } from 'http';


function AddCost() {
  const navigate = useNavigate();
  const params = useParams(); // 리스트 번호
  
  const memberList = useAppSelector(state => state.memberList); // 멤버 리스트
  const cost = useAppSelector(state => state.cost); // 비용 리스트
  console.log(memberList);
  console.log('cost:',cost);

  let [costValues, setCostValues] = useState({
    calculateListNum: params.num,
    title: '',
    payer: '',
    id: '',
    cost: '',
    content: ''
  });

  
  let onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => { // 변경된 제목 저장
    setCostValues((value) => ({...value, title: e.target.value}));
  }; 
  
  let onChangePayer = (e: React.ChangeEvent<HTMLSelectElement>) => { // 변경된 지불인 아이디, 닉네임 저장
    setCostValues((value) => ({...value, id: e.target.value, payer: e.target.options[e.target.selectedIndex].text}));
  }; 
  
  let onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => { // 변경된 비용 저장
    if (/[0-9]/g.test(e.target.value) && !/[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(e.target.value)) {
      let value = (e.target.value.replaceAll(',', ''));
      if (Number(value) > 10000000) {
        alert("10,000,000원을 초과할 수 없습니다.")
        value = '10000000';
      }
      let formatValue = Number(value).toLocaleString('ko-KR');
      e.target.value = formatValue; 
    } else {
      e.target.value = (e.target.value.replaceAll(/[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
    }
             
    setCostValues((value) => ({...value, cost: e.target.value.replaceAll(',', '')}));
  }; 

  let onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => { // 변경된 내용 저장
    setCostValues((value) => ({...value, content: e.target.value}));
  }; 

  /* 지출 저장 */
  const click_RegisterBtn = async () => {
    if (costValues.title && costValues.payer && costValues.cost && costValues.content) {
      const state = await addCost(costValues);

      if (state.status === 200) {
        navigate('/appointment/' + params.num);
      } else {
        console.log(state.message);
        console.log(state.status);
        alert("저장에 실패했습니다.");
      }

    } else {
      alert("작성되지 않은 부분이 있습니다.");
    }
  }

  return(
    <Container>
      <Container__Title>
        <input type="text" placeholder='제목을 입력하세요' onChange={onChangeTitle}/>
      </Container__Title>
      <Container__Contents>
        <Contents_Cost_Payer>
          <Contents_Cost>
            <input type="text" maxLength={10} onChange={onChangeCost}/>
            <p>원</p>
          </Contents_Cost>
          <Contents_Payer onChange={onChangePayer} value={costValues.id}>
            {
              memberList.map((x, index) => {
                return(
                  <option key={index} value={x.id}>{x.nickname}</option>
                )
              })
            }        
          </Contents_Payer>
          <p>최대 10,000,000원까지 입력이 가능합니다.</p>
        </Contents_Cost_Payer>
      </Container__Contents>

      <Conainer__Content>
        <textarea placeholder='내용을 입력하세요' onChange={onChangeContent}/>
      </Conainer__Content>
        
      <Contianer__RegisterBtn>
        <input type="button" value="등록" onClick={click_RegisterBtn}/>
      </Contianer__RegisterBtn>
    </Container>
  )
}

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
min-height: 100vh;
background-color: #322c58;

@media screen and (max-width: 768px) {

} 
`

const Container__Title = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 5%;
    background-color: #322c58;
    border: none;
    border-bottom: 1px solid #ffffff;
    outline: none;
    color: #ffffff;
    font-size: 2rem;

    ::placeholder {
      color: #a2a2a2;
    }
  }
`

const Container__Contents = styled.div`
  width: 100%;
  padding: 0 5%;
  height: 70px;
`

const Contents_Cost_Payer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  position: relative;
  height: 100%;

  & > p {
    position: absolute;
    bottom: 0;
    right: 23%;
    font-size: 1.2rem;
    color: yellow;
  }
`

const Contents_Cost = styled.div`
position: relative;
height: 50px;
display: flex;
flex-direction: row;
align-items: center;
width: 80%;
border-radius: 4px;
overflow: hidden;

& > input {
  -moz-appearance: textfield; // firefox에서 화살표 제거
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: right;
  padding-right: 35px;
  font-size: 2rem;
  outline: none;
  border: none;
  font-weight: bold;

  // chrome, safari, edge, opera에서 화살표 제거
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

& > p {
  position: absolute;
  color: #000000;
  font-size: 2rem;
  right: 10px;
}
`

const Contents_Payer = styled.select`
  background-color: #ffffff;
  width: 20%;
  height: 50px;
  border-radius: 4px;
`

const Conainer__Content = styled.div`
padding: 0 5%;
width: 100%;
margin-bottom: 20px;;

& > textarea {
  width: 100%;
  resize: none;
  height: 400px;
  margin-top: 10px;
  outline: none;
  border: 1px solid #ffffff;
  background-color: #322c58;
  padding: 15px;
  color: #ffffff;
  border-radius: 4px;
}
`

const Contianer__RegisterBtn = styled.div`
text-align: center;
padding: 0 5%;
width: 100%;

& > input {
  width: 100%;
  background-color: #74b99a;
  border: none;
  color: #ffffff;
  height: 40px;
  width: 50%;
  border-radius: 8px;
}
`

export default AddCost;