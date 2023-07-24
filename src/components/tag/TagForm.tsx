import { defineComponent, reactive } from 'vue';
import style from './Tag.module.scss';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import { Button } from '../../shared/Button';

export const TagForm = defineComponent({
    setup: () => {
        const formData = reactive({
            name: '',
            sign: '',
        })
        const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
        const onSubmit = (e: Event) => {
            e.preventDefault()
            const rules: Rules<typeof formData> = [
                { key: 'name', message: '必填', type: 'required' },
                { key: 'name', message: '只能填1-4个字符', type: 'pattern', regex: /^.{1,4}$/ },
                { key: 'sign', message: '必填', type: 'required' },
            ]
            Object.assign(errors, {
                name: undefined, sign: undefined
            })
            Object.assign(errors, validate(formData, rules))
        }
        return () => (
            <form class={style.form} onSubmit={onSubmit}>
                <div class={style.formRow}>
                    <label class={style.formLabel}>
                        <span class={style.formItem_name}>标签名</span>
                        <div class={style.formItem_value}>
                            <input v-model={formData.name} class={[style.formItem, style.input, style.error]}></input>
                        </div>
                        <div class={style.formItem_errorHint}>
                            <span>{errors['name']?.[0]}</span>
                        </div>
                    </label>
                </div>
                <div class={style.formRow}>
                    <label class={style.formLabel}>
                        <span class={style.formItem_name}>符号 {formData.sign}</span>
                        <div class={style.formItem_value}>
                            <EmojiSelect v-model={formData.sign} class={[style.formItem, style.emojiList, style.error]} />
                        </div>
                        <div class={style.formItem_errorHint}>
                            <span>{errors['sign']?.[0]}</span>
                        </div>
                    </label>
                </div>
                <p class={style.tips}>记账时长按标签即可进行编辑</p>
                <div class={style.formRow}>
                    <div class={style.formItem_value}>
                        <Button class={[style.formItem, style.button]}>确定</Button>
                    </div>
                </div>
            </form>
        )
    }
})