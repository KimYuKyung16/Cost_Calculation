import { defaultInstance, authInstance } from '../utils/instance'

export const getUserList = async (searchVal: {}) => { // 전체 유저 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.get(`/friend/userList`, searchVal);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const addFriend = async (receiver: {}) => { // 친구 추가하기
  try {
    const { data, status } = await defaultInstance.post(`/friend/addFriend`, receiver);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const getReceivingList = async () => { // 친구 신청 받은 거 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.get(`/friend/receivingList`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const acceptFriend = async (userInfo: {}) => { // 친구 신청 수락하기
  try {
    const { data, status } = await defaultInstance.post(`/friend/receivingList/accept`, userInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const getSearchFriendList = async (searchVal: {}) => { // 검색된 친구 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.get(`/searchFriendList`, searchVal);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const getFriendList = async () => { // 친구 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.get(`/friendList`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const deleteFriend = async (userID: {}) => { // 친구 삭제하기
  try {
    const { data, status } = await defaultInstance.delete(`/friendList`, userID);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

