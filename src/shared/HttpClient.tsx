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

httpClient.instance.interceptors.response.use(response => {//interceptors拦截器,统一处理错误
    // console.log('response')
    return response
}, (error) => {
    if (error.response) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 429) {
            alert('点击过于频繁')
        }
    }
    throw error
})