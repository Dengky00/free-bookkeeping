import { defineComponent, PropType, ref } from 'vue';
import style from './InputPad.module.scss';
import { Icon } from '../../shared/Icon';
import dayjs from 'dayjs'
import { DatePicker, Popup } from 'vant';
import 'vant/lib/index.css';

export const InputPad = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            default: '',
        }
    },
    setup: (props, context) => {
        const refAmount = ref('')
        const now = new Date()
        const refDate = ref([dayjs(now).format('YYYY'), dayjs(now).format('MM'), dayjs(now).format('DD')])
        const vantDate = ref(refDate.value)
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false

        return () => (
            <div class={style.numberPad}>
                <div class={style.dateAndAmount}>
                    <div>
                        <span class={style.date} onClick={showDatePicker}>
                            <Icon name="date" class={style.icon} />
                            {refDate.value[0] + '-' + refDate.value[1] + '-' + refDate.value[2]}
                        </span>
                        <Popup position='bottom'
                            v-model:show={refDatePickerVisible.value}
                            onClickOverlay={() => { vantDate.value = refDate.value; }}>
                            <DatePicker v-model={vantDate.value} title='选择日期'
                                onConfirm={() => { refDate.value = vantDate.value; hideDatePicker() }}
                                onCancel={() => { vantDate.value = refDate.value; hideDatePicker() }} />
                        </Popup>
                    </div>
                    <div class={[style.amount, refAmount.value === '' ? style.empty : '']}>
                        <div>{refAmount.value}</div>
                    </div>
                </div>

                <div class={style.buttons}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button class={style.delete}>
                        <Icon name="backspace" class={style.icon} />
                    </button>
                    {/* <button>+</button> */}
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    {/* <button>-</button> */}
                    <button class={style.ok}>OK</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button class={style.zero}>0</button>
                    <button class={style.point}>.</button>
                </div>
            </div>
        )
    }
})