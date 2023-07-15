import { defineComponent, ref, watchEffect } from 'vue';
import style from './welcome.module.scss';
import { useSwipe } from '../../hooks/useSwipe';
import { useRouter } from 'vue-router';

export const First = defineComponent({
    setup: () => {
        return () => (
            <div class={style.card}>
                <svg>
                    <use xlinkHref='#money'></use>
                </svg>
                <h2>会挣钱<br />还会省钱</h2>
            </div>
        )
    }
})