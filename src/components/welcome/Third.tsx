import { defineComponent } from 'vue';
import style from './First.module.scss'
import chart from '../../assets/icons/chart.svg'
import { RouterLink } from 'vue-router';

export const Third = defineComponent({
    setup: () => {
        return () => (
            <div class={style.wrapper}>
                <div class={style.card}>
                    <img src={chart} />
                    <h2>会挣钱<br />还要会省钱</h2>
                </div>
                <div class={style.actions}>
                    <RouterLink class={style.fake} to="">跳过</RouterLink>
                    <RouterLink to="/welcome/4">下一页</RouterLink>
                    <RouterLink to="/start">跳过</RouterLink>
                </div>
            </div>
        )
    }
})