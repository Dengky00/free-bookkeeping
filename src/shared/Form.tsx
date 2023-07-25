import { computed, defineComponent, PropType, ref } from 'vue';
import { EmojiSelect } from './EmojiSelect';
import style from './Form.module.scss';
import { DatePicker, Popup } from 'vant';

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
        label: {
            type: String
        },
        modelValue: {
            type: [String, Number, Array]
        },
        type: {
            type: String as PropType<'text' | 'emojiSelect' | 'date'>,
        },
        error: {
            type: String
        }
    },
    setup: (props, context) => {
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
                case 'text':
                    return <input
                        value={props.modelValue}
                        onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                        class={[style.formItem, style.input, style.error]} />
                case 'emojiSelect':
                    return <EmojiSelect
                        modelValue={props.modelValue?.toString()}
                        onUpdateModelValue={value => context.emit('update:modelValue', value)}
                        class={[style.formItem, style.emojiList, style.error]} />
                case 'date':
                    return <>
                        <input readonly={true}
                            value={showDate.value}
                            class={[style.formItem, style.input, style.error]}
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