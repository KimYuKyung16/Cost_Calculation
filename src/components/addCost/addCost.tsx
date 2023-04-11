/** 
 * 지출 등록 - 정보 입력 부분
 * 
 */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addCost } from "../../apis/api/cost"; // API

import { useAppSelector } from "../../redux/hooks";

import * as AddCostStyle from "../../styles/addCost/addCostStyle";


function AddCost() {
  const navigate = useNavigate();
  const params = useParams(); 
  const num = params.num; // 리스트 번호
  
  const memberList = useAppSelector(state => state.memberList); // 멤버 리스트

  let [costValues, setCostValues] = useState({ // 제일 처음사람으로 초기화
    calculateListNum: num,
    title: '',
    payer: memberList[0].nickname,
    id: memberList[0].id,
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
        navigate('/calculate/' + params.num);
      } else if (state.status === 600) {
        alert("로그인 상태가 아닙니다. 다시 로그인해주세요.");
        navigate('/login');
      } else {
        alert("저장에 실패했습니다.");
      }
    } else {
      alert("작성되지 않은 부분이 있습니다.");
    }
  }

  return(
    <AddCostStyle.Container>
      <AddCostStyle.Container__Title>
        <input type="text" placeholder='제목을 입력하세요' onChange={onChangeTitle}/>
      </AddCostStyle.Container__Title>
      <AddCostStyle.Container__Contents>
        <AddCostStyle.Contents_Cost_Payer>
          <AddCostStyle.Contents_Cost>
            <input type="text" maxLength={10} onChange={onChangeCost}/>
            <p>원</p>
          </AddCostStyle.Contents_Cost>
          <AddCostStyle.Contents_Payer onChange={onChangePayer} value={costValues.id}>
            {
              memberList.map((x, index) => {
                return(
                  <option key={index} value={x.id}>{x.nickname}</option>
                )
              })
            }        
          </AddCostStyle.Contents_Payer>
          <p>최대 10,000,000원까지 입력이 가능합니다.</p>
        </AddCostStyle.Contents_Cost_Payer>
      </AddCostStyle.Container__Contents>

      <AddCostStyle.Container__Content>
        <textarea placeholder='내용을 입력하세요' onChange={onChangeContent}/>
      </AddCostStyle.Container__Content>
        
      <AddCostStyle.Container__RegisterBtn>
        <input type="button" value="등록" onClick={click_RegisterBtn}/>
      </AddCostStyle.Container__RegisterBtn>
    </AddCostStyle.Container>
  )
}



export default AddCost;