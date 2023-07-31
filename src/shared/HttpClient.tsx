import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };
//封装axios
export class HttpClient {
    instance: AxiosInstance
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL
        })
    }
    //查read
    get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
    }
    //增create
    post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
        return this.instance.request<R>({ ...config, url, data, method: 'post' })
    }
    //改update
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
        return this.instance.request<R>({ ...config, url, data, method: 'patch' })
    }
    //删destroy
    delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
    }
}
export const httpClient = new HttpClient('/api/v1')

httpClient.instance.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {//Authorization是HTTP请求头部的一种类型,用于传递身份验证信息,Bearer方案是一种用于简化身份验证的标准格式
        config.headers!.Authorization = `Bearer ${jwt}`
    }
    return config
})

httpClient.instance.interceptors.response.use(response => {//interceptors响应拦截器,统一处理错误
    console.log('response')
    return response
}, (error) => {//error类型为any,因为不一定是请求错误,原因有多种,比如语法错误
    if (error.response) {//所有此次要判断error是否有response,即请求错误
        const axiosError = error as AxiosError//断言error类型,后续方便使用ts语法提示
        if (axiosError.response?.status === 429) {
            alert('点击过于频繁')
        }
    }
    throw error
})