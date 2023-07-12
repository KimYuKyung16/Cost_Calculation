import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface calculateListTypeState {
  type: string;
}

interface calculateListTypeCountState {
  count: string;
}

interface membersState {
  id: string;
  nickname: string;
  profile: string;
}
interface calculateListState {
  num: number;
  id: string;
  calculate_name: string;
  members: membersState[] | any;
  bookmark: string;
  date: string;
  time: string;
  state: string;
}

const initialState: calculateListState[] = []; // 검색된 유저 리스트
const initialState2: calculateListTypeState = { type: '1' };
const initialState3: calculateListTypeCountState[] = []; // 타입별 개수

// 일정 리스트
const calculateListSlice = createSlice({
  name: 'calculateList', // 슬라이스 이름
  initialState, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialCalculateList: (state, action: PayloadAction<calculateListState[]>) => action.payload,
    setBookmark: (state, action: PayloadAction<any>) => {
      state[action.payload.index].bookmark = action.payload.bookmark;
    }
  }
})

// 일정 리스트 타입 설정
const calculateListTypeSlice = createSlice({
  name: 'calculateListType', // 슬라이스 이름
  initialState: initialState2, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialCalculateListType: (state, action: PayloadAction<string>) => { state.type = action.payload },
  }
})

// 일정 리스트 타입별 개수
const calculateListTypeCountSlice = createSlice({
  name: 'calculateListCountType', // 슬라이스 이름
  initialState: initialState3, // 초기 상태
  reducers:{ // 리듀서 설정
    setInitialCalculateListTypeCount: (state, action: PayloadAction<calculateListTypeCountState[]>) => action.payload,
  }
})

export const calculateListActions = calculateListSlice.actions;
export const calculateListTypeActions = calculateListTypeSlice.actions;
export const calculateListTypeCountActions = calculateListTypeCountSlice.actions;

export const calculateListReducer = calculateListSlice.reducer;
export const calculateListTypeReducer = calculateListTypeSlice.reducer;
export const calculateListTypeCountReducer = calculateListTypeCountSlice.reducer;