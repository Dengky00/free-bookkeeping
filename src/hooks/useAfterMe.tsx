import { onMounted } from 'vue'
import { useMeStore } from '../stores/useMeStore'
//登录后再执行数据请求
export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()
  onMounted(async () => {
    await meStore.mePromise
    fn()
  })
}
