import { defaultInstance, authInstance } from '../utils/instance'

// 타입별 리스트 개수 가져오기
export const getCalculateTypeCount = async (calculateTypeCountInfo: {}) => { 
  try {
    const { data, status } = await defaultInstance.get(`/calculateList`, calculateTypeCountInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 리스트 가져오기
export const getCalculateList = async (calculateListInfo: {}) => { 
  try {
    const { data, status } = await defaultInstance.get(`/calculateList`, calculateListInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 추가하기
export const addCalculate = async (calculateInfo: {}) => { 
  try {
    const { data, status } = await defaultInstance.post(`/calculate`, calculateInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}


// 즐겨찾기 삭제하기
export const deleteBookmark = async (num: number) => { 
  try {
    const { data, status } = await defaultInstance.delete(`/calculateList/bookmark/${num}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 즐겨찾기 추가하기
export const addBookmark = async (num: number) => { 
  try {
    const { data, status } = await defaultInstance.post(`/calculateList/bookmark/${num}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}