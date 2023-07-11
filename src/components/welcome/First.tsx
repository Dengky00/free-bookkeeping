import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import style from './WelcomeLayout.module.scss'
import money from '../../assets/icons/money.svg'

export const First = () => (
    <WelcomeLayout>
        {{
            icon: () => <img src={money} />,
            title: () => <h2>会挣钱<br />还要会省钱</h2>,
            buttons: () => <>
                <RouterLink class={style.fake} to="">跳过</RouterLink>
                <RouterLink to="/welcome/3">下一页</RouterLink>
                <RouterLink to="/start">跳过</RouterLink>
            </>
        }}
    </WelcomeLayout>
)
First.displayName = 'First'
