import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import style from './Overlay.module.scss';
import { Icon } from './Icon';

export const OverLay = defineComponent({
    setup: (props, context) => {
        return () => (
            <div class={style.overlay}>
                <section class={style.currentUser}>
                    <h2>未登录用户</h2>
                    <p>点击这里登录</p>
                </section>
                <nav>
                    <ul class={style.action_list}>
                        <li>
                            <RouterLink to="/statistics" class={style.action}>
                                <Icon name='charts' class={style.icon} />
                                <span>统计图表</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/export" class={style.action}>
                                <Icon name='export' class={style.icon} />
                                <span>导出数据</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/notify" class={style.action}>
                                <Icon name='notify' class={style.icon} />
                                <span>记账提醒</span>
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
})