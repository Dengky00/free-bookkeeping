import { defineComponent, PropType } from 'vue';
import style from './InputPad.module.scss';
import { Icon } from '../../shared/Icon';

export const InputPad = defineComponent({
    props: {
        amount: {
            type: String as PropType<string>,
            default: '123456789.23',
        }
    },
    setup: (props, context) => {
        return () => (
            <div class={style.numberPad}>
                <div class={style.dateAndAmount}>
                    <div class={style.date}>
                        <Icon name="date" class={style.icon} />
                        <input type="date" />
                    </div>
                    <div class={[style.amount, props.amount === '' ? style.empty : '']}>
                        <div>{props.amount}</div>
                    </div>
                </div>

                <div class={style.buttons}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>+</button>
                    {/* <button class={style.date}>
                        <Icon name="date" class={style.icon} />
                        时间
                    </button> */}
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>-</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button class={style.ok}>OK</button>
                    <button class={style.zero}>0</button>
                    <button class={style.point}>.</button>
                    <button class={style.delete}>
                        <Icon name="backspace" class={style.icon} />
                    </button>
                </div>
            </div>
        )
    }
})