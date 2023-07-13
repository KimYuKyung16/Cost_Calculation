import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImemberList {
  id: string;
  nickname: string;
  profile: string;
}

interface completeState {
  state: boolean;
  memberCount: number;
  memberList: ImemberList[];
}

interface appointmentState {
  calculateListNum: string | undefined;
  calculateName: string;
  memberCount: number;
  complete: completeState;
}

const initialState: appointmentState = {
  calculateListNum: "0",
  calculateName: "",
  memberCount: 0,
  complete: {
    state: false,
    memberCount: 0,
    memberList: [],
  },
};

interface IaddMemberList {
  id: string;
  nickname: string;
  profile: string;
}

const initialState2: {deleteMemberList: string[], addMemberList: IaddMemberList[]} = {
  deleteMemberList: [],
  addMemberList: [],
};

// 정산 정보
const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    setCaculateListNum: (state, action: PayloadAction<string | undefined>) => {
      state.calculateListNum = action.payload;
    },
    setCalculateName: (state, action: PayloadAction<string>) => {
      state.calculateName = action.payload;
    },
    setMemberCount: (state, action: PayloadAction<number>) => {
      state.memberCount = action.payload;
    },

    setInitialComplete: (state, action: PayloadAction<completeState>) => {
      state.complete = action.payload;
    },
    setCompleteState: (state, action: PayloadAction<boolean>) => {
      state.complete.state = action.payload;
    },
    setCompleteMemberCount: (state, action: PayloadAction<number>) => {
      state.complete.memberCount = action.payload;
    },
    // setInitialcalculateList: (state, action: PayloadAction<calculateListState[]>) => action.payload,
    // setBookmark: (state, action: PayloadAction<any>) => {
    //   state[action.payload.index].bookmark = action.payload.bookmark;
    // }
  },
});

// 정산 수정 정보
const modifyCalculateSlice = createSlice({
  name: "modifyCalculate",
  initialState: initialState2,
  reducers: {
    setDeleteMemberList: (state, action: PayloadAction<string[]>) => {
      state.deleteMemberList = action.payload;
    },
    setAddMemberList: (state, action: PayloadAction<IaddMemberList[]>) => {
      state.addMemberList = action.payload;
    },
  },
});

export const calculateActions = calculateSlice.actions;
export const modifyCalculateActions = modifyCalculateSlice.actions;

export const calculateReducer = calculateSlice.reducer;
export const modifyCalculateReducer = modifyCalculateSlice.reducer;
