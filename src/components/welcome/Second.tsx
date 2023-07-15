import { defineComponent, ref, watchEffect } from 'vue';
import style from './welcome.module.scss';
import { useSwipe } from '../../hooks/useSwipe';
import { useRouter } from 'vue-router';

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