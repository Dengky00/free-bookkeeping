import { defineComponent, onMounted, reactive } from 'vue'
import { Button } from '../../shared/Button'
import { Form, FormItem } from '../../shared/Form'
import { Rules, hasError, validate } from '../../shared/validate'
import style from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router'
import { httpClient } from '../../shared/HttpClient'
import { onFormError } from '../../shared/onFormError'

export const TagForm = defineComponent({
  props: {
    id: Number,
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive<Partial<Tag>>({
      //代表可以只包含部分Tag中的类型
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind!.toString(),
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1 到 4 个字符',
        },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        //error为const常量对象只读,用assign省去分别对每个属性操作
        name: undefined,
        sign: undefined,
      })
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? httpClient.patch(`/tags/${formData.id}`, formData, {
              params: { _mock: 'tagEdit' },
            })
          : httpClient.post('/tags', formData, {
              params: { _mock: 'tagCreate' },
            })
        await promise.catch((error) =>
          onFormError(error, (data) => Object.assign(errors, data.errors)),
        )
        router.back()
      }
    }
    //判断是编辑标签页面,则渲染已要编辑的标签信息
    onMounted(async () => {
      if (!props.id) {
        return
      }
      const response = await httpClient.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {
          _mock: 'tagShow',
        },
      )
      Object.assign(formData, response.data.resource) //传递所编辑的标签信息
    })

    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名(最多4个字符)"
          type="text"
          v-model={formData.name}
          error={errors['name'] ? errors['name'][0] : '　'}
        />
        <FormItem
          label={'符号 ' + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors['sign'] ? errors['sign'][0] : '　'}
        />
        <FormItem>
          <p class={style.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={[style.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    )
  },
})
