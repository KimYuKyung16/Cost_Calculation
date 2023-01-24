import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const appointmentListActions = appointmentListSlice.actions;

export const appointmentListReducer = appointmentListSlice.reducer;