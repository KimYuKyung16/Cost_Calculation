import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface appointmentListTypeState {
  type: number;
}

interface membersState {
  id: string;
  nickname: string;
  profile: string;
}
interface appointmentListState {
  num: number;
  id: string;
  calculate_name: string;
  members: membersState[] | any;
  bookmark: string;
}

const initialState: appointmentListState[] = []; // 검색된 유저 리스트
const initialState2: appointmentListTypeState = {
  type: 1
};

const appointmentListSlice = createSlice({
  name: 'appointmentList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialAppointmentList: (state, action: PayloadAction<appointmentListState[]>) => action.payload,
    setBookmark: (state, action: PayloadAction<any>) => {
      state[action.payload.index].bookmark = action.payload.bookmark;
    }
  }
})

// 약속 리스트 타입 설정
const appointmentListTypeSlice = createSlice({
  name: 'appointmentListType', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialAppointmentListType: (state, action: PayloadAction<number>) => { state.type = action.payload },
  }
})

export const appointmentListActions = appointmentListSlice.actions;
export const appointmentListTypeActions = appointmentListTypeSlice.actions;

export const appointmentListReducer = appointmentListSlice.reducer;
export const appointmentListTypeeducer = appointmentListTypeSlice.reducer;