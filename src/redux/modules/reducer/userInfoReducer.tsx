import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInfoState {
  userID: string;
  nickname: string;
  profile: string;
}

const initialState: userInfoState = {
  userID: '',
  nickname: '',
  profile: '',
}

/* createSlice: 리듀서 함수의 대상인 초기 상태와 슬라이스 이름을 받아 
 리듀서와 상태에 해당하는 액션 생성자와 액션 타입을 자동으로 생성하는 함수 */

const userInfoSlice = createSlice({
  name: 'userInfo', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setUserID(state, action: PayloadAction<string>) { 
      state.userID = action.payload;
    },
    setNickname(state, action: PayloadAction<string>){
      state.nickname = action.payload;
    },
    setProfile(state, action: PayloadAction<string>) {
      state.profile = action.payload;
    }
  }
})

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;