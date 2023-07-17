import { PropType, defineComponent } from 'vue';

export const Icon = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props) => {
        return () => (
            <svg>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})