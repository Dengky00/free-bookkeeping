import { defineComponent } from 'vue';
import style from './welcome.module.scss';

export const Second = defineComponent({
    setup: () => {
        return () => (
            <div class={style.card}>
                <svg>
                    <use xlinkHref='#remind'></use>
                </svg>
                <h2>每日提醒<br />不遗漏每一笔账单</h2>
            </div>
        )
    }
})