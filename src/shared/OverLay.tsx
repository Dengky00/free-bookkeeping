import { Transition, defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import style from './Overlay.module.scss'
import { Icon } from './Icon'
import { showConfirmDialog } from 'vant'
import { useMeStore } from '../stores/useMeStore'
import { useSeletedStore } from '../stores/useSelectedStore'

export const OverLay = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore()
    const route = useRoute()
    const router = useRouter()
    const me = ref<User>()
    const selectedStore = useSeletedStore()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async () => {
      await showConfirmDialog({
        title: '确认',
        message: '你真的要退出登录吗？',
      })
      localStorage.removeItem('jwt')
      if (route.path === '/items') {
        window.location.reload()
      } else {
        await router.push('/items')
        window.location.reload()
      }
    }
    watchEffect(() => {
      if (route.path === '/items') {
        selectedStore.changeOverLay('记账')
      } else if (route.path === '/statistics') {
        selectedStore.changeOverLay('图表')
      } else if (route.path === '/export') {
        selectedStore.changeOverLay('导出')
      } else {
        selectedStore.changeOverLay('提醒')
      }
    })

    return () => (
      <div class={style.overlay}>
        <section class={style.currentUser}>
          {me.value ? (
            <div>
              <h2 class={style.email}>{me.value.email}</h2>
              <p onClick={onSignOut}>点击这里退出登录</p>
            </div>
          ) : (
            <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
              <h2>未登录用户</h2>
              <p>点击这里登录</p>
            </RouterLink>
          )}
        </section>
        <nav>
          <ul class={style.action_list}>
            <li class={selectedStore.overlay === '记账' ? style.selected : ''}>
              <RouterLink to="/items" class={style.action}>
                <Icon name="items" class={style.icon} />
                <span>查看记账</span>
              </RouterLink>
            </li>
            <li class={selectedStore.overlay === '图表' ? style.selected : ''}>
              <RouterLink to="/statistics" class={style.action}>
                <Icon name="charts" class={style.icon} />
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li class={selectedStore.overlay === '导出' ? style.selected : ''}>
              <RouterLink to="/export" class={style.action}>
                <Icon name="export" class={style.icon} />
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li class={selectedStore.overlay === '提醒' ? style.selected : ''}>
              <RouterLink to="/notify" class={style.action}>
                <Icon name="notify" class={style.icon} />
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  },
})

export const OverLayIcon = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <>
        <Icon name="menu" onClick={onClickMenu} />
        <Transition
          leaveActiveClass={style.leaveActive}
          enterActiveClass={style.enterActive}
          leaveToClass={style.leaveTo}
          enterFromClass={style.enterFrom}
        >
          {overlayVisible.value && <OverLay />}
        </Transition>
      </>
    )
  },
})
