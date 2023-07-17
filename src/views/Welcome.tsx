import { Transition, VNode, defineComponent, ref, watchEffect } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import style from './Welcome.module.scss';
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
import { Icon } from '../shared/Icon';

//不加Record<string, string>ts代码检查会报错,因为route.name的值可能不是四个key之一
const pushMap: Record<string, string> = {
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/welcome/4',
}
//开屏四个欢迎界面
export const Welcome = defineComponent({
    setup: () => {
        const route = useRoute()
        const router = useRouter()
        const main = ref<HTMLElement>()
        const { swiping, distance, direction } = useSwipe(main, { beforeStart: e => e.preventDefault() })
        const replace = throttle(() => {//节流防止滑动事件连续触发
            const name = (route.name || 'Welcome1').toString()
            router.replace(pushMap[name])
        }, 500)
        watchEffect(() => {//监听作用域内所有变化的值
            if (swiping.value && direction.value === 'left' && Math.abs(distance.value!.x) > 30) {
                replace()
            }
        })
        return () => (
            <div class={style.wrapper}>
                <header>
                    <Icon name='bird' class={style.icon} />
                    <h1>自由记账</h1>
                </header>
                <main ref={main}>
                    <RouterView name='main' >
                        {({ Component: C }: { Component: VNode }) =>
                            <Transition
                                leaveActiveClass={style.leaveActive}
                                enterActiveClass={style.enterActive}
                                leaveToClass={style.leaveTo}
                                enterFromClass={style.enterFrom}
                            >
                                {C}
                            </Transition>
                        }
                    </RouterView>
                </main>
                <footer><RouterView name='footer' /></footer>
            </div>
        )
    }
})