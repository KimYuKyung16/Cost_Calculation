import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInfoState {
  userID: string;
  userPW: string;
}

const initialState: userInfoState = {
  userID: '',
  userPW: ''
}

// function reducer(state = userID, action) {
//   if (action.type === 'set') {
//     userID = userID;
//     return userID
//   } else {
//     return userID
//   }
// }

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers:{
    setUserID(state, action: PayloadAction<string>){
      state.userID = action.payload;
    },
    setUserPW(state, action: PayloadAction<string>) {
      state.userPW = action.payload;
    }
  }
})

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;

// export default reducer;