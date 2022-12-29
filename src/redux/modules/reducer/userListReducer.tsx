import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userListState {
  id: string;
  pw: string;
  nickname: string;
  profile: string;
}

interface waitingListState {
  sender: string;
  receiver: string;
  state: string;
}

const initialState: userListState[] = []; // 검색된 유저 리스트
const initialState2: string = '';
const initialState3: waitingListState[] = []; // 친구 대기중인 유저 리스트

const userListSlice = createSlice({
  name: 'userList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialUserList: (state, action: PayloadAction<userListState[]>) => action.payload,
  }
})

const userSearchSlice = createSlice({
  name: 'userSearch', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    setSearch: (state, action: PayloadAction<string>) => action.payload,
  }
})

const waitingListSlice = createSlice({
  name: 'waitingList', // 슬라이스 이름
  initialState: initialState3, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialWaitingList: (state, action: PayloadAction<waitingListState[]>) => action.payload,
  }
})


const receivingListSlice = createSlice({
  name: 'receivingList', // 슬라이스 이름
  initialState: initialState3, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialReceivingList: (state, action: PayloadAction<waitingListState[]>) => action.payload,
  }
})

export const userListActions = userListSlice.actions;
export const userSearchActions = userSearchSlice.actions;
export const waitingListActions = waitingListSlice.actions;
export const receivingListActions = receivingListSlice.actions;

export const userListReducer = userListSlice.reducer;
export const userSearchReducer = userSearchSlice.reducer;
export const waitingListReducer = waitingListSlice.reducer;
export const receivingListReducer = receivingListSlice.reducer;