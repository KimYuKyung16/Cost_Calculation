import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface friendListState {
  id: string;
  nickname: string;
  profile: string;
}

const initialState: friendListState[] = []; // 멤버 리스트를 변경

const friendListSlice = createSlice({ // 멤버 리스트 변경
  name: 'friendList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialFriendList: (state, action: PayloadAction<friendListState[]>) => action.payload,
    deleteFriend: (state, action: PayloadAction<number>) => { state.splice(action.payload, 1) }
  }
})

export const friendListActions = friendListSlice.actions;

export const friendListReducer = friendListSlice.reducer;
