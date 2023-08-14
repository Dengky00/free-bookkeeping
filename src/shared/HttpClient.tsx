import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance,
  mockItemSummary,
  mockSession,
  mockTagEdit,
  mockTagIndex,
  mockTagShow,
} from '../mock/mock'
import { closeToast, showLoadingToast } from 'vant'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

//封装axios
export class HttpClient {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }
  //查read
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get',
    })
  }
  //增create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  //改update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PatchConfig,
  ) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  //删destroy
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: DeleteConfig,
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'delete',
    })
  }
}

const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== 'localhost' && //如果不是本地服务器就不使用mock
    location.hostname !== '127.0.0.1' &&
    location.hostname !== '192.168.3.57'
  ) {
    return false
  }
  switch (response.config?._mock) {
    case 'session':
      ;[response.status, response.data] = mockSession(response.config)
      return true
    case 'tagShow':
      ;[response.status, response.data] = mockTagShow(response.config)
      return true
    case 'tagEdit':
      ;[response.status, response.data] = mockTagEdit(response.config)
      return true
    case 'tagIndex':
      ;[response.status, response.data] = mockTagIndex(response.config)
      return true
    case 'itemCreate':
      ;[response.status, response.data] = mockItemCreate(response.config)
      return true
    case 'itemIndex':
      ;[response.status, response.data] = mockItemIndex(response.config)
      return true
    case 'itemIndexBalance':
      ;[response.status, response.data] = mockItemIndexBalance(response.config)
      return true
    case 'itemSummary':
      ;[response.status, response.data] = mockItemSummary(response.config)
      return true
  }
  return false
}

export const httpClient = new HttpClient('/api/v1') //封装连接的服务器

httpClient.instance.interceptors.request.use((config) => {
  //请求拦截,每条请求带上本地存储的jwt,标志是否登录
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    //Authorization是HTTP请求头部的一种类型,用于传递身份验证信息,Bearer方案是一种用于简化身份验证的标准格式
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  if (config._autoLoading === true) {
    //请求带有_autoLoading参数则展示加载动画
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
  }
  return config
})
httpClient.instance.interceptors.response.use(
  (response) => {
    if (response.config._autoLoading === true) {
      closeToast()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._autoLoading === true) {
      closeToast()
    }
    throw error
  },
)

httpClient.instance.interceptors.response.use(
  (response) => {
    mock(response) //响应拦截,判断是否返回模拟数据
    if (response.status >= 400) {
      throw { response }
    } else {
      return response
    }
  },
  (error) => {
    mock(error.response)
    if (error.response.status >= 400) {
      throw error
    } else {
      return error.response
    }
  },
)

//interceptors响应拦截器,统一处理错误
httpClient.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    //error类型为any,因为不一定是请求错误,原因有多种,比如语法错误
    if (error.response) {
      //所有此次要判断error是否有response,即请求错误
      const axiosError = error as AxiosError //断言error类型,后续方便使用ts语法提示
      if (axiosError.response?.status === 429) {
        alert('点击过于频繁')
      }
    }
    throw error
  },
)
