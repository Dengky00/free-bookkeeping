import style from './welcome.module.scss';
import remind from '../../assets/icons/remind.svg'

export const Second = () => (
    <div class={style.card}>
        <img src={remind} />
        <h2>每日提醒<br />不遗漏每一笔账单</h2>
    </div>
)
Second.displayName = 'Second'