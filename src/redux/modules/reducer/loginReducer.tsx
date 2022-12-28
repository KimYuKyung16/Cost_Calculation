import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loginState {
  userID: string;
  userPW: string;
}

const initialState: loginState = {
  userID: '',
  userPW: ''
}


/* createSlice: 리듀서 함수의 대상인 초기 상태와 슬라이스 이름을 받아 
 리듀서와 상태에 해당하는 액션 생성자와 액션 타입을 자동으로 생성하는 함수 */

const loginSlice = createSlice({
  name: 'login', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setUserID(state, action: PayloadAction<string>){ // 액션 생성
      state.userID = action.payload;
    },
    setUserPW(state, action: PayloadAction<string>) { // 액션 생성
      state.userPW = action.payload;
    }

  }
})

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;