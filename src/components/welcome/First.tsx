import style from './welcome.module.scss';

export const First = () => (
    <div class={style.card}>
        <svg>
            <use xlinkHref='#money'></use>
        </svg>
        <h2>会挣钱<br />还会省钱</h2>
    </div>
)
First.displayName = 'First'
