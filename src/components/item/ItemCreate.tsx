import { defineComponent, PropType } from 'vue';
import style from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div class={style.wrapper}>ItemCreate</div>
        )
    }
})