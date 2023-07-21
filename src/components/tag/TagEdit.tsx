import { defineComponent, PropType } from 'vue';
import style from './TagEdit.module.scss';

export const TagEdit = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div class={style.wrapper}>TagEdit</div>
        )
    }
})