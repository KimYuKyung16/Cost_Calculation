import { defaultInstance, authInstance } from '../utils/instance'

// 쪽지 리스트 가져오기
export const getMessageListApi = async () => { 
  try {
    const { data, status } = await defaultInstance.get(`/message`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 메시지 읽음 표시 처리하기
export const changeMessageReadApi = async (num: {}) => { 
  try {
    const { data, status } = await defaultInstance.put(`/message`, num);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 메시지 삭제하기
export const deleteMessageApi = async (messageNum: number) => { 
  try {
    const { data, status } = await defaultInstance.delete(`/message/${messageNum}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 메시지 전체 삭제하기
export const deleteTotalMessageApi = async () => { 
  try {
    const { data, status } = await defaultInstance.delete(`/message`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}