import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import style from './WelcomeLayout.module.scss'
import cloud from '../../assets/icons/cloud.svg'

export const Forth = () => (
    <WelcomeLayout>
        {{
            icon: () => <img src={cloud} />,
            title: () => <h2>云备份<br />再也不怕数据丢失</h2>,
            buttons: () => <>
                <RouterLink class={style.fake} to="">跳过</RouterLink>
                <RouterLink to="/start">开始记账</RouterLink>
                <RouterLink class={style.fake} to="">跳过</RouterLink>
            </>
        }}
    </WelcomeLayout>
)
Forth.displayName = 'Forth'