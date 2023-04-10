/* 정산 리스트의 멤버 관련 인터페이스 */
export interface IMembersState {
  id: string;
  nickname: string;
  profile: string;
}

/* 정산 리스트 관련 인터페이스 */
export interface ICalculateListState {
  num: number;
  id: string;
  calculate_name: string;
  members: IMembersState[] | any;
  bookmark: string;
  date: string;
  time: string;
  state: string;
}
