import { AxiosResponse } from 'axios'
import { httpClient } from './HttpClient'
//获取当前登录用户
export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined

export const refreshMe = () => {
  mePromise = httpClient.get<Resource<User>>('/me')
  return mePromise
}

export const fetchMe = refreshMe
