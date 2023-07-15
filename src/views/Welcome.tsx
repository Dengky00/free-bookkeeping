import { Transition, VNode, defineComponent, ref, watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import style from './Welcome.module.scss';
import { useSwipe } from '../hooks/useSwipe';
//开屏四个欢迎界面
export const Welcome = defineComponent({
    setup: () => {
        const main = ref<HTMLElement | null>(null)
        const { direction } = useSwipe(main)
        watchEffect(() => {//监听作用域内所有变化的值
            console.log('fang', direction.value);
        })
        return () =>
            <div class={style.wrapper}>
                <header>
                    <svg>
                        <use xlinkHref='#bird'></use>
                    </svg>
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
    }
})