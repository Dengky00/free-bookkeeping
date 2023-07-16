import { PropType, defineComponent } from 'vue';
import style from './Icon.module.scss';

// interface Props {
//     name: string
// }
export const Icon = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props) => {
        return () => (
            <svg class={style}>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})