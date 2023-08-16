import { defineStore } from 'pinia'
import { httpClient } from '../shared/HttpClient'
import { AxiosResponse } from 'axios'

type MeState = {
  me?: User
  mePromise?: Promise<AxiosResponse<Resource<User>>>
}
type MeActions = {
  refreshMe: () => void
  fetchMe: () => void
}
export const useMeStore = defineStore<string, MeState, {}, MeActions>('me', {
  //js函数直接返回对象要加括号
  state: () => ({ me: undefined, mePromise: undefined }),
  actions: {
    refreshMe() {
      this.mePromise = httpClient.get<Resource<User>>('/me')
    },
    fetchMe() {
      this.refreshMe()
    },
  },
})
