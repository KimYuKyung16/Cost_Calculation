import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface appointmentListTypeState {
  type: string;
}

interface appointmentListTypeCountState {
  count: string;
}

// interface membersState {
//   id: string;
//   nickname: string;
//   profile: string;
// }
// interface appointmentListState {
//   num: number;
//   id: string;
//   calculate_name: string;
//   members: membersState[] | any;
//   bookmark: string;
//   date: string;
//   time: string;
//   state: string;
// }

// const initialState: appointmentListState[] = []; // 검색된 유저 리스트
const initialState2: appointmentListTypeState = {
  type: '1'
};
const initialState3: appointmentListTypeCountState[] = []; // 타입별 개수

// 일정 리스트
// const appointmentListSlice = createSlice({
//   name: 'appointmentList', // 슬라이스 이름
//   initialState, // 초기 상태
//   reducers:{ // 리듀서 설정
//     setInitialAppointmentList: (state, action: PayloadAction<appointmentListState[]>) => action.payload,
//     setBookmark: (state, action: PayloadAction<any>) => {
//       state[action.payload.index].bookmark = action.payload.bookmark;
//     }
//   }
// })

// 일정 리스트 타입 설정
const appointmentListTypeSlice = createSlice({
  name: 'appointmentListType', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialAppointmentListType: (state, action: PayloadAction<string>) => { state.type = action.payload },
  }
})

// 일정 리스트 타입별 개수
const appointmentListTypeCountSlice = createSlice({
  name: 'appointmentListCountType', // 슬라이스 이름
  initialState: initialState3, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialAppointmentListTypeCount: (state, action: PayloadAction<appointmentListTypeCountState[]>) => action.payload,
  }
})

// export const appointmentListActions = appointmentListSlice.actions;
export const appointmentListTypeActions = appointmentListTypeSlice.actions;
export const appointmentListTypeCountActions = appointmentListTypeCountSlice.actions;

// export const appointmentListReducer = appointmentListSlice.reducer;
export const appointmentListTypeReducer = appointmentListTypeSlice.reducer;
export const appointmentListTypeCountReducer = appointmentListTypeCountSlice.reducer;