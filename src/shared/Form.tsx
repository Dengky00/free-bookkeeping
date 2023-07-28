import { computed, defineComponent, PropType, ref } from 'vue';
import { EmojiSelect } from './EmojiSelect';
import style from './Form.module.scss';
import { DatePicker, Popup } from 'vant';
import { Button } from './Button';

export const Form = defineComponent({
    props: {
        onSubmit: {
            type: Function as PropType<(e: Event) => void>,
        }
    },
    setup: (props, context) => {
        return () => (
            <form class={style.form} onSubmit={props.onSubmit}>
                {context.slots.default?.()}
            </form>
        )
    }
})

export const FormItem = defineComponent({
    props: {
        label: String,
        modelValue: [String, Number, Array],
        type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
        error: String,
        placeholder: String,
        onClick: Function as PropType<() => void>,
        countFrom: {
            type: Number,
            default: 60,
        },
        // options: Array as PropType<Array<{ value: string, text: string }>>
    },
    setup: (props, context) => {
        const timer = ref<number>()
        const count = ref<number>(props.countFrom)
        const isCounting = computed(() => !!timer.value)//!!代表isCounting值与timer.value保持一致
        const startCount = () => {
            timer.value = setInterval(() => {
                count.value -= 1
                if (count.value === 0) {
                    clearInterval(timer.value)
                    timer.value = undefined
                    count.value = props.countFrom
                }
            }, 1000)
        }
        context.expose({ startCount })
        const refDatePickerVisible = ref(false)
        const hideDatePicker = () => { refDatePickerVisible.value = false }
        const showDatePicker = () => { refDatePickerVisible.value = true }
        const vantDate = ref(props.modelValue)
        const showDate = computed(() => {
            if (vantDate.value instanceof Array) {
                return (vantDate.value[0] + '-' + vantDate.value[1] + '-' + vantDate.value[2])
            } else {
                return ''
            }
        })
        const content = computed(() => {
            switch (props.type) {
                case 'text'://文本表单
                    return <input
                        value={props.modelValue} placeholder={props.placeholder}
                        onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                        class={[style.formItem, style.input]} />
                case 'emojiSelect'://emoji表单
                    return <EmojiSelect
                        modelValue={props.modelValue?.toString()}
                        onUpdateModelValue={value => context.emit('update:modelValue', value)}
                        class={[style.formItem, style.emojiList]} />
                case 'date'://日期表单
                    return <>
                        <input readonly={true}
                            value={showDate.value}
                            class={[style.formItem, style.input]}
                            onClick={showDatePicker} />
                        <Popup position='bottom' v-model:show={refDatePickerVisible.value}
                            onClickOverlay={(e: Event) => {
                                e.preventDefault()
                                vantDate.value = props.modelValue;
                            }}>
                            <DatePicker v-model={vantDate.value} title='选择日期'
                                onConfirm={() => { context.emit("update:modelValue", vantDate.value); hideDatePicker() }}
                                onCancel={() => { vantDate.value = props.modelValue; hideDatePicker() }} />
                        </Popup>
                    </>
                case 'validationCode'://验证码表单
                    return <>
                        <input value={props.modelValue} placeholder={props.placeholder}
                            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                            class={[style.formItem, style.input, style.validationCodeInput]} />
                        <Button disabled={isCounting.value} onClick={props.onClick} class={style.validationButton}>
                            {isCounting.value ? `${count.value}秒后重置` : '发送验证码'}
                        </Button>
                    </>
                // case 'select'://下拉框表单
                //     return <select value={props.modelValue}
                //         class={[style.formItem, style.select]}
                //         onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}>
                //         {props.options?.map(option =>
                //             <option value={option.value}>{option.text}</option>
                //         )}
                //     </select>
                case undefined:
                    return context.slots.default?.()
            }
        })
        return () => {
            return <div class={style.formRow}>
                <label class={style.formLabel}>
                    {props.label &&
                        <span class={style.formItem_name}>{props.label}</span>
                    }
                    <div class={style.formItem_value}>
                        {content.value}
                    </div>
                    {props.error &&
                        <div class={style.formItem_errorHint}>
                            <span>{props.error}</span>
                        </div>
                    }
                </label>
            </div>
        }
    }
})