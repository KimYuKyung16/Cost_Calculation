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

const initialState3: appointmentNameState = {
  name: ''
}

const memberListSlice = createSlice({ // 멤버 리스트 변경
  name: 'memberList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    // 액션 생성
    // setUserID: (state, action: PayloadAction<string>) => { state[0].userID = action.payload },
    setInitialMemberList: (state, action: PayloadAction<memberListState[]>) => action.payload,
    addMember: (state, action: PayloadAction<memberListState>) => { state.push(action.payload) },
    deleteMember: (state, action: PayloadAction<number>) => { state.splice(action.payload, 1) }
  }
})

const memberSlice = createSlice({ // 멤버의 정보 변경
  name: 'member', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    // 액션 생성
    // setUserID: (state, action: PayloadAction<string>) => { state.userID = action.payload },
    setNickname: (state, action: PayloadAction<string>) => { state.nickname = action.payload },
    // setProfile: (state, action: PayloadAction<string>) => { state.userID = action.payload }
  }
})

const appointmentSlice = createSlice({ // 정산 약속 이름 변경
  name: 'appointmentName', // 슬라이스 이름
  initialState: initialState3, // 초기 상태
  reducers:{ // 리듀서 설정
    setAppointmentName: (state, action: PayloadAction<string>) => { state.name = action.payload },
  }
})

export const memberListActions = memberListSlice.actions;
export const memberActions = memberSlice.actions;
export const appointmentActions = appointmentSlice.actions;

export const memberListReducer = memberListSlice.reducer;
export const memberReducer = memberSlice.reducer;
export const appointmentReducer = appointmentSlice.reducer;