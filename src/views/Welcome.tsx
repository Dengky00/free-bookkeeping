import { Transition, VNode, defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import style from './Welcome.module.scss';

export const Welcome = defineComponent({
    setup: () => {
        return () =>
            <div class={style.wrapper}>
                <header>
                    <svg>
                        <use xlinkHref='#bird'></use>
                    </svg>
                    <h1>自由记账</h1>
                </header>
                <main>
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