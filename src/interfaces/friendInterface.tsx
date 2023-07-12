/* 유저 리스트 관련 인터페이스  */
export interface userListState {
  id: string;
  nickname: string;
  profile: string;
  userID: string;
  friendID: string;
  sender: string;
  receiver: string;
}


/* 친구 신청 받은 리스트 관련 인터페이스  */
export  interface waitingListState {
  id: string;
  nickname: string;
  profile: string;
  sender: string;
  receiver: string;
}