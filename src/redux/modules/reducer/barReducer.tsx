import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface barState {
  visible: string; // 바 상태값
}

// 친구 검색창 상태값
interface friendVisibleState {
  visible: string; // 바 상태값
}

const initialState: barState = {
  visible: 'none',
}; 

const initialState2: friendVisibleState = {
  visible: 'block',
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

export const barActions = barSlice.actions;
export const friendVisibleActions = friendVisibleSlice.actions;

export const barReducer = barSlice.reducer;
export const friendVisibleReducer = friendVisibleSlice.reducer;