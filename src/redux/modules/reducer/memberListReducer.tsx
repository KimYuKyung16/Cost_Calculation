import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface memberListState {
  userID: string;
  nickname: string;
  profile: string;
}

const initialState2: memberListState = { // 멤버 한명의 값들을 변경
  userID: '',
  nickname: '',
  profile: ''
};

const initialState: memberListState[] = [{ // 멤버 리스트를 변경
  userID: '',
  nickname: '',
  profile: ''
}];

const memberListSlice = createSlice({
  name: 'memberList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    // 액션 생성
    // setUserID: (state, action: PayloadAction<string>) => { state[0].userID = action.payload },
    setMemberList: (state, action: PayloadAction<memberListState[]>) => action.payload,
    addMember: (state, action: PayloadAction<memberListState>) => { state.push(action.payload) }
  }
})

const memberSlice = createSlice({
  name: 'member', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    // 액션 생성
    setUserID: (state, action: PayloadAction<string>) => { state.userID = action.payload },
    setNickname: (state, action: PayloadAction<string>) => { state.userID = action.payload },
    setProfile: (state, action: PayloadAction<string>) => { state.userID = action.payload }
  }
})

export const memberListActions = memberListSlice.actions;
export const memberActions = memberSlice.actions;
export default memberListSlice.reducer;