import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../shared/Button';
import { Form, FormItem } from '../../shared/Form';
import { Rules, validate } from '../../shared/validate';
import style from './Tag.module.scss';

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
                { key: 'name', type: 'required', message: '必填' },
                { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
                { key: 'sign', type: 'required', message: '必填' },
            ]
            Object.assign(errors, {//error为const常量对象只读,用assign省去分别对每个属性操作
                name: undefined,
                sign: undefined,
            })
            Object.assign(errors, validate(formData, rules))
        }
        return () => (
            <Form onSubmit={onSubmit}>
                <FormItem label='标签名'
                    type="text"
                    v-model={formData.name}
                    error={errors['name'] ? errors['name'][0] : '　'} />
                <FormItem label={'符号 ' + formData.sign}
                    type="emojiSelect" v-model={formData.sign}
                    error={errors['sign'] ? errors['sign'][0] : '　'} />
                <FormItem>
                    <p class={style.tips}>记账时长按标签即可进行编辑</p>
                </FormItem>
                <FormItem>
                    <Button class={[style.button]}>确定</Button>
                </FormItem>
            </Form>
        )
    }
})