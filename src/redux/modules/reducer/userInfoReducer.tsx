import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInfoState {
  nickname: string;
  profile: string;
  file: string;
}

const initialState: userInfoState = {
  nickname: '',
  profile: '',
  file: ''
}

/* createSlice: 리듀서 함수의 대상인 초기 상태와 슬라이스 이름을 받아 
 리듀서와 상태에 해당하는 액션 생성자와 액션 타입을 자동으로 생성하는 함수 */

const userInfoSlice = createSlice({
  name: 'userInfo', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setNickname(state, action: PayloadAction<string>){ // 액션 생성
      state.nickname = action.payload;
    },
    setProfile(state, action: PayloadAction<string>) { // 액션 생성
      state.profile = action.payload;
    },
    setFile(state, action: PayloadAction<string>) { // 액션 생성
      state.file = action.payload;
    }
  }
})

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;