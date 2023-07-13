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

// 정산 추가하기
export const modifyCalculate = async (num:string | undefined, calculateInfo: {}) => { 
  try {
    const { data, status } = await defaultInstance.put(`/calculate/${num}`, calculateInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 삭제하기
export const deleteCalculate = async (num: string | undefined) => { 
  try {
    const { data, status } = await defaultInstance.delete(`/calculate/${num}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 이름 가져오기
export const getCalculateTitle = async (num: string | undefined) => { 
  try {
    const { data, status } = await defaultInstance.get(`/calculate/${num}/title`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 상태 가져오기
export const getCalculateComplete = async (num: string | undefined) => { 
  try {
    const { data, status } = await defaultInstance.get(`/calculate/${num}/complete`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 상태 취소하기
export const deleteCalculateComplete = async (num: string | undefined) => { 
  try {
    const { data, status } = await defaultInstance.delete(`/calculate/${num}/complete`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 정산 상태 추가하기
export const addCalculateComplete = async (num: string | undefined) => { 
  try {
    const { data, status } = await defaultInstance.post(`/calculate/${num}/complete`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}


// 정산 상태 수정하기
export const changeCalculateComplete = async (num: string | undefined, state: string) => { 
  try {
    const { data, status } = await defaultInstance.put(`/calculate/${num}/complete/${state}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

// 멤버 리스트 가져오기
export const getMemberList = async (calculateNum: {}) => { 
  try {
    const { data, status } = await defaultInstance.get(`/calculate/memberList`, calculateNum);
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


// 내가 시작한 정산 리스트 가져오기
export const getMyCalculateList = async (current_page: number) => { 
  try {
    const { data, status } = await defaultInstance.get(`/mycalculateList/${current_page}`);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

