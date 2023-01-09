import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface costInfo {
  title: string; // 제목
  id: string; // 지불인 아이디
  payer: string; // 지불인 닉네임
  cost: string; // 비용
  content: string; // 지불 내용
  receipt: string; // 영수증 사진 주소,
}
interface costState {
  title: string; // 제목
  id: string; // 지불인 아이디
  payer: string; // 지불인 닉네임
  cost: string; // 비용
  content: string; // 지불 내용
  receipt: string; // 영수증 사진 주소,
  list: costInfo[] // cost 리스트
}

const initialState: costState = {
  title: '',
  id: '',
  payer: '',
  cost: '',
  content: '',
  receipt: '',
  list: []
}; 

const costSlice = createSlice({
  name: 'cost', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    // setInitialcost: (state, action: PayloadAction<costState>) => action.payload,
    setcostTitle: (state, action: PayloadAction<string>) => { state.title = action.payload },
    setcostID: (state, action: PayloadAction<string>) => { state.id = action.payload },
    setcostPayer: (state, action: PayloadAction<string>) => { state.payer = action.payload },
    setcostCost: (state, action: PayloadAction<string>) => { state.cost = action.payload },
    setcostContent: (state, action: PayloadAction<string>) => { state.content = action.payload },

    setcostList: (state, action: PayloadAction<costInfo[]>) => { state.list = action.payload }
  }
})

export const costActions = costSlice.actions;

export const costReducer = costSlice.reducer;