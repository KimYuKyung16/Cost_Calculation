import { defaultInstance, authInstance } from "../utils/instance";

// 지출 추가하기
export const addCost = async (costInfo: {}) => {
  try {
    const { data, status } = await defaultInstance.post(`/cost`, costInfo);
    return { data, status };
  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status };
  }
};

// 전체 지출 리스트 가져오기
export const getCostList = async (costInfo: {}) => {
  try {
    const { data, status } = await defaultInstance.get(`/cost/list`, costInfo);
    return { data, status };
  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status };
  }
};

// 지출 삭제하기
export const deleteCost = async (num: number) => {
  try {
    console.log(num)
    const { data, status } = await defaultInstance.delete(`/cost/${num}`);
    return { data, status };
  } catch (e: any) {
    return { message: e.response.data.message, status: e.response.status };
  }
};
