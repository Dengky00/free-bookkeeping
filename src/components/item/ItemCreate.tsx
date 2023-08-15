import { defineComponent, reactive } from 'vue'
import style from './ItemCreate.module.scss'
import { MainLayout } from '../../layouts/MainLayout'
import { Tab, Tabs } from '../../shared/Tabs'
import { InputPad } from './InputPad'
import { Tags } from './Tags'
import { httpClient } from '../../shared/HttpClient'
import { useRouter } from 'vue-router'
import { showDialog } from 'vant'
import { AxiosError } from 'axios'
import { BackIcon } from '../../shared/BackIcon'

export const ItemCreate = defineComponent({
  setup: (props, context) => {
    //formDate类型是部分Item类型
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: '',
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n'),
        })
      }
      throw error
    }
    const onSubmit = async () => {
      if (formData.tag_ids && formData.tag_ids.length !== 0) {
        await httpClient
          .post<Resource<Item>>('/items', formData, {
            _mock: 'itemCreate',
            _autoLoading: true,
          })
          .catch(onError)
        router.push('/items')
      } else {
        showDialog({
          title: '出错',
          message: '未选择标签',
        })
      }
    }

    return () => (
      <MainLayout class={style.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={style.wrapper}>
                <Tabs v-model:selected={formData.kind} class={style.tabs}>
                  <Tab value="expenses" name="支出">
                    <Tags kind="expenses" v-model:selected={formData.tag_ids![0]} />
                  </Tab>
                  <Tab value="income" name="收入">
                    <Tags kind="income" v-model:selected={formData.tag_ids![0]} />
                  </Tab>
                </Tabs>
                <div class={style.inputPad_wrapper}>
                  <InputPad
                    v-model:amount={formData.amount}
                    v-model:happenAt={formData.happen_at}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
