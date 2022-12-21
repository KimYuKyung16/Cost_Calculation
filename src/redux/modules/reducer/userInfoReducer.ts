import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: 'none',
  userPW: 'none'
}

// function reducer(state = userID, action) {
//   if (action.type === 'set') {
//     userID = userID;
//     return userID
//   } else {
//     return userID
//   }
// }

//test

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers:{
    setUserID(state, action){
      state.userID = action.payload;
    },
    setUserPW(state, action) {
      state.userPW = action.payload;
    }
  }
})

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;

// export default reducer;