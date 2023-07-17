import { defineComponent } from 'vue';
import style from './Button.module.scss';

interface Props {//告诉typescript可接受的外部属性声明,通过代码检查不报错
    onClick?: (e: MouseEvent) => void
}
export const Button = defineComponent<Props>({
    setup: (props, context) => {
        return () => (
            <button class={style.button}>
                {context.slots.default?.()}
            </button>
        )
    }
})