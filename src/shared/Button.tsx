import { PropType, computed, defineComponent, ref } from 'vue';
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
        type: {
            type: String as PropType<'submit' | 'button'>,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        autoSelfDisabled: {//默认不开启自我沉默
            type: Boolean,
            default: false
        },
    },
    setup: (props, context) => {
        const selfDisabled = ref(false)
        const _disabled = computed(() => {
            if (props.autoSelfDisabled === false) {//外部是否要求自我沉默
                return props.disabled
            }
            if (selfDisabled.value) {//先判断自我沉默
                return true
            } else {
                return props.disabled//再判断外部是否要求沉默
            }
        })
        const onClick = (e: MouseEvent) => {
            props.onClick?.(e)
            selfDisabled.value = true
            setTimeout(() => {
                selfDisabled.value = false
            }, 500)//按钮点击后自我沉默0.5秒
        }
        return () => (
            <button onClick={onClick} type={props.type} disabled={_disabled.value} class={[style.button, style[props.level]]}>
                {context.slots.default?.()}
            </button>
        )
    }
})