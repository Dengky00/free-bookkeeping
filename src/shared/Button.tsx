import { PropType, defineComponent } from 'vue';
import style from './Button.module.scss';

// interface Props {//告诉typescript可接受的外部属性声明,通过代码检查不报错
//     onClick?: (e: MouseEvent) => void
// }
export const Button = defineComponent({
    props: {
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        },
        level: {
            type: String as PropType<'important' | 'normal' | 'danger'>,
            default: 'important',
        },
    },
    setup: (props, context) => {
        return () => (
            <button onClick={props.onClick} class={[style.button, style[props.level]]}>
                {context.slots.default?.()}
            </button>
        )
    }
})