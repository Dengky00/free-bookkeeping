import { defineStore } from 'pinia'
import { httpClient } from '../shared/HttpClient'
import { Dayjs } from 'dayjs'

type State = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  _fetch: (firstPage: boolean, startDate: Dayjs, endDate: Dayjs) => void //是否重新加载第一页
  fetchItems: (startDate: Dayjs, endDate: Dayjs) => void //加载第一页
  fetchNextPage: (startDate: Dayjs, endDate: Dayjs) => void //加载下一页
}
//请求记账记录
export const useItemStore = (id: string | string[]) =>
  //用pinia的id区分不同时间范围的数据
  defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0,
    }),
    actions: {
      async _fetch(firstPage, startDate, endDate) {
        const response = await httpClient.get<Resources<Item>>(
          '/items',
          {
            happen_after: startDate.format('YYYY-MM-DD'),
            happen_before: endDate.format('YYYY-MM-DD'),
            page: firstPage ? 1 : this.page + 1,
          },
          { _mock: 'itemIndex', _autoLoading: true },
        )
        const { resources, pager } = response.data
        if (firstPage) {
          this.items = resources
        } else {
          this.items.push(...resources)
        }
        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
      },
      async fetchItems(startDate, endDate) {
        this._fetch(true, startDate, endDate)
      },
      async fetchNextPage(startDate, endDate) {
        this._fetch(false, startDate, endDate)
      },
    },
  })()
