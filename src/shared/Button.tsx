import { defineComponent } from 'vue';
import style from './Button.module.scss';

interface Props {//可接受的外部属性声明
    onClick: (e: MouseEvent) => void
}
export const Button = defineComponent<Props>({
    setup: (props, context) => {
        return () => (
            <button class={style}>
                {context.slots.default?.()}
            </button>
        )
    }
})