import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface memberListState {
  id: string;
  nickname: string;
  profile: string;
}

const initialState2: memberListState = { // 멤버 한명의 값들을 변경
  id: '',
  nickname: '',
  profile: ''
};

const initialState: memberListState[] = []; // 멤버 리스트를 변경

interface appointmentNameState {
  name: string;
}

const initialState3: string = '';

const memberListSlice = createSlice({ // 멤버 리스트 변경
  name: 'memberList', 
  initialState, 
  reducers:{
    // setUserID: (state, action: PayloadAction<string>) => { state[0].userID = action.payload },
    setInitialMemberList: (state, action: PayloadAction<memberListState[]>) => action.payload,
    addMember: (state, action: PayloadAction<memberListState>) => { state.push(action.payload) },
    deleteMember: (state, action: PayloadAction<number>) => { state.splice(action.payload, 1) }
  }
})

const calculateNameSlice = createSlice({ // 정산 약속 이름 변경
  name: 'calculateName', 
  initialState: initialState3, 
  reducers:{
    setCalculateName: (state, action: PayloadAction<string>) => action.payload,
  }
})

export const memberListActions = memberListSlice.actions;
export const calculateNameActions = calculateNameSlice.actions;

export const memberListReducer = memberListSlice.reducer;
export const calculateNameReducer = calculateNameSlice.reducer;