import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userListState {
  id: string;
  // pw: string;
  nickname: string;
  profile: string;
  // friend: string;
  userID: string;
  friendID: string;
  sender: string;
  receiver: string;
  state: string;
}

interface waitingListState {
  // id: string;
  nickname: string;
  profile: string;
  sender: string;
  receiver: string;
  state: string;
}

const initialState: userListState[] = []; // 검색된 유저 리스트
const initialState2: string = '';
const initialState3: waitingListState[] = []; // 친구 대기중인 유저 리스트

const userListSlice = createSlice({
  name: 'userList', 
  initialState, 
  reducers:{
    setInitialUserList: (state, action: PayloadAction<userListState[]>) => action.payload,
  }
})

const userSearchSlice = createSlice({
  name: 'userSearch', 
  initialState: initialState2, 
  reducers:{
    setSearch: (state, action: PayloadAction<string>) => action.payload,
  }
})

const waitingListSlice = createSlice({
  name: 'waitingList', 
  initialState: initialState3, 
  reducers:{
    setInitialWaitingList: (state, action: PayloadAction<waitingListState[]>) => action.payload,
  }
})


const receivingListSlice = createSlice({
  name: 'receivingList', 
  initialState: initialState3, 
  reducers:{
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