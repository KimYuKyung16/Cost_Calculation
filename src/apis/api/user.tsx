import { defaultInstance, authInstance } from '../utils/instance'

interface IUserRegister { // 회원가입
  userID: string,
  userPW: string,
  nickname: string,
}

interface IUserLogin { // 로그인
  userID: string,
  userPW: string
}

export const register = async (userInfo: IUserRegister) => { // 회원가입
  try {
    const { data } = await defaultInstance.post(`/auth/register`, userInfo);
    return data
  } catch (e) {
    console.error(e);
  }
}

export const login = async (userInfo: IUserLogin) => { // 로그인
  try {
    const { data, status } = await defaultInstance.post(`/auth/login`, userInfo);
    return { data, status }
  } catch (e: any) {
    return {message: e.response.data.message, status: e.response.status}
  }
}

export const authentication = async () => { // 로그인 여부 확인
  try {
    const { data, status } = await defaultInstance.get(`/auth/authentication`);
    return { data, status }
  } catch (e: any) {
    console.log(e)
    return {message: e.response.data.message, status: e.response.status}
  }
}

