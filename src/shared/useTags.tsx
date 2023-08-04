import { onMounted, ref } from 'vue'
import { AxiosResponse } from 'axios'

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>
//分页加载标签
export const useTags = (fetcher: Fetcher) => {
  const page = ref(0) //记录已请求的页数
  const hasMore = ref(false) //判断是否还有更多数据
  const tags = ref<Tag[]>([])
  const fetchTags = async () => {
    //向服务器请求tag数据(url,请求的数据参数)
    const response = await fetcher(page.value)
    const { resources, pager } = response.data
    tags.value.push(...resources)
    hasMore.value =
      (pager.page - 1) * pager.per_page + resources.length < pager.count
    page.value += 1
  }
  onMounted(fetchTags)
  return { page, hasMore, tags, fetchTags }
}
