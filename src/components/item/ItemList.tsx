import { defineComponent, PropType } from 'vue';
import style from './ItemList.module.scss';
export const ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div class={style.wrapper}>ItemList</div>
        )
    }
})