import { BackdropProps } from "@material-ui/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBarState {
  visible: string; // 바 상태값
}

// 친구 검색창 상태값
interface IFriendVisibleState {
  visible: string; // 바 상태값
}

interface IMmodalState {
  state: boolean;
  content: string;
  index: number | null;
  userID: string;
  title: string;
  cost: string;
  payer: string;
}

const initialState: IBarState = {
  visible: 'none',
}; 

const initialState2: IFriendVisibleState = {
  visible: 'block',
}; 

const initialState3: IMmodalState = {
  state: false, 
  content: '',
  index: null,
  userID: '',
  title: '',
  cost: '',
  payer: ''
}; 

const initialState4: {state: boolean} = {
  state: false
}; 



const barSlice = createSlice({
  name: 'bar', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setVisible: (state, action: PayloadAction<string>) => { state.visible = action.payload },
  }
})

const friendVisibleSlice = createSlice({
  name: 'friendVisible', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    setVisible: (state, action: PayloadAction<string>) => { state.visible = action.payload },
  }
})

const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: initialState3, 
  reducers:{ // 리듀서 설정
    setState: (state, action: PayloadAction<boolean>) => { state.state = action.payload },
    setIndex: (state, action: PayloadAction<number | null>) => { state.index = action.payload },
    setTitle: (state, action: PayloadAction<string>) => { state.title = action.payload },
    setCost: (state, action: PayloadAction<string>) => { state.cost = action.payload },
    setContent: (state, action: PayloadAction<string>) => { state.content = action.payload },
    setUserID: (state, action: PayloadAction<string>) => { state.userID = action.payload },
    setPayer: (state, action: PayloadAction<string>) => { state.payer = action.payload },
  }
})

const costListDeleteStateSlice = createSlice({ // 정산 리스트 삭제 표시 state
  name: 'costListDeleteState',
  initialState: initialState4,
  reducers:{ // 리듀서 설정
    setState: (state, action: PayloadAction<boolean>) => { state.state = action.payload },
  }
})

export const barActions = barSlice.actions;
export const friendVisibleActions = friendVisibleSlice.actions;
export const modalStateActions = modalStateSlice.actions;
export const costListDeleteStateActions = costListDeleteStateSlice.actions;

export const barReducer = barSlice.reducer;
export const friendVisibleReducer = friendVisibleSlice.reducer;
export const modalStateReducer = modalStateSlice.reducer;
export const costListDeleteStateReducer = costListDeleteStateSlice.reducer;