import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface signUpFormState {
  nickname: string; 
  userID: string;
  userPW: string;
  userConfirmPW: string;
}

const initialState: signUpFormState = { // 멤버 한명의 값들을 변경
  nickname: '',
  userID: '',
  userPW: '',
  userConfirmPW: ''
};

const signUpFormSlice = createSlice({
  name: 'signUpForm', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    // 액션 생성
    setNickname: (state, action: PayloadAction<string>) => { state.nickname = action.payload },
    setUserID: (state, action: PayloadAction<string>) => { state.userID = action.payload },
    setUserPW: (state, action: PayloadAction<string>) => { state.userPW = action.payload },
    setUserConfirmPW: (state, action: PayloadAction<string>) => { state.userConfirmPW = action.payload }
  }
})

export const signUpFormActions = signUpFormSlice.actions;
export default signUpFormSlice.reducer;