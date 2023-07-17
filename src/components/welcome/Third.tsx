import { defineComponent } from 'vue';
import style from './welcome.module.scss';

export const Third = defineComponent({
    setup: () => {
        return () => (
            <div class={style.card}>
                <svg>
                    <use xlinkHref='#chart'></use>
                </svg>
                <h2>数据可视化<br />收支一目了然</h2>
            </div>
        )
    }
})