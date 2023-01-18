import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface barState {
  visable: string; // 바 상태값
}

const initialState: barState = {
  visable: 'none'
}; 

const barSlice = createSlice({
  name: 'bar', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setBar: (state, action: PayloadAction<string>) => { 
      state.visable = action.payload 
    }
  }
})

export const barActions = barSlice.actions;

export const barReducer = barSlice.reducer;