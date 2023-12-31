import { defineComponent, PropType, reactive, ref } from 'vue'
import style from './SignInPage.module.scss'
import { MainLayout } from '../layouts/MainLayout'
import { Icon } from '../shared/Icon'
import { Form, FormItem } from '../shared/Form'
import { Button } from '../shared/Button'
import { hasError, Rules, validate } from '../shared/validate'
import { httpClient } from '../shared/HttpClient'
import { useBool } from '../hooks/useBool'
import { useRoute, useRouter } from 'vue-router'
import { BackIcon } from '../shared/BackIcon'
import { useMeStore } from '../stores/useMeStore'

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const router = useRouter()
    const route = useRoute()
    const refValidationCode = ref<any>()
    const { ref: refDisabled, toggle, on: disabled, off: enable } = useBool(false)
    const formData = reactive({
      email: '',
      code: '',
    })
    const errors = reactive<FormErrors<typeof formData>>({})
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const rules: Rules<typeof formData> = [
        { key: 'email', type: 'required', message: '必填' },
        {
          key: 'email',
          type: 'pattern',
          regex: /.+@.+/,
          message: '必须是邮箱地址',
        },
        { key: 'code', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        email: undefined,
        code: undefined,
      })
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        //不存在验证错误即可登录
        const response = await httpClient
          .post<{ jwt: string }>('/session', formData)
          .catch(onError)
        localStorage.setItem('jwt', response.data.jwt)
        const returnTo = route.query.return_to?.toString()
        meStore.refreshMe()
        router.push(returnTo || '/')
      }
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      //点击发送验证码
      disabled() //在完成网络请求回应之前无法点击
      await httpClient
        .post(
          '/validation_codes',
          { email: formData.email },
          {
            _autoLoading: true,
          },
        )
        .catch(onError)
        .finally(enable)
      refValidationCode.value.startCount()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <BackIcon />,
          default: () => (
            <div class={style.wrapper}>
              <div class={style.logo}>
                <Icon class={style.icon} name="bird" />
                <h1 class={style.appName}>自由记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email ? errors.email[0] : '　'}
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  disabled={refDisabled.value}
                  placeholder="请输入六位数字"
                  onClick={onClickSendValidationCode}
                  v-model={formData.code}
                  error={errors.code ? errors.code[0] : '　'}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
export default SignInPage
