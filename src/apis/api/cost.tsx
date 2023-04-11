import { defaultInstance, authInstance } from '../utils/instance'

export const addCost = async (costInfo: {}) => { // 전체 유저 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.post(`/cost`, costInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const getCostList = async (costInfo: {}) => { // 전체 지출 리스트 가져오기
  try {
    const { data, status } = await defaultInstance.get(`/cost/list`, costInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}