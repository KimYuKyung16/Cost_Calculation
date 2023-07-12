/* 멤버 정보 */
export interface MemberInterface {
  id: string; // 아이디
  nickname: string; // 닉네임 
  profile: string; // 프로필
  totalCost: number; // 총 지출비
  lackCost: number; // 더 내야하는 비용
  excessCost: number; // 받아야 하는 비용
}