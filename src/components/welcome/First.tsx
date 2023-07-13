import style from './welcome.module.scss';
import money from '../../assets/icons/money.svg'

export const First = () => (
    <div class={style.card}>
        <img src={money} />
        <h2>会挣钱<br />还会省钱</h2>
    </div>
)
First.displayName = 'First'
