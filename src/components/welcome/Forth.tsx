import { defineComponent } from 'vue';
import style from './First.module.scss'
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from 'vue-router';

export const Forth = defineComponent({
    setup: () => {
        return () => (
            <div class={style.wrapper}>
                <div class={style.card}>
                    <img src={cloud} />
                    <h2>会挣钱<br />还要会省钱</h2>
                </div>
                <div class={style.actions}>
                    <RouterLink class={style.fake} to="">跳过</RouterLink>
                    <RouterLink to="/welcome/start">开始记账</RouterLink>
                    <RouterLink class={style.fake} to="">跳过</RouterLink>
                </div>
            </div>
        )
    }
})