import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'
import { createPinia } from 'pinia'
import { useMeStore } from './stores/useMeStore'

const pinia = createPinia()
const router = createRouter({ history, routes })
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()
//导航守卫,除了白名单页面进入前都要判断是否登录
const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/items': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}
router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
    () => true,
    () => '/sign_in?return_to=' + to.path,
  )
})
