import { defineComponent, reactive, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { Tags } from './Tags';
import { httpClient } from '../../shared/HttpClient';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { AxiosError } from 'axios';

export const ItemCreate = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            kind: '支出',
            tags_id: [],
            amount: '',
            happen_at: '',
        })
        const router = useRouter()
        const onError = (error: AxiosError<ResourceError>) => {
            if (error.response?.status === 422) {
                Dialog.alert({
                    title: '出错',
                    message: Object.values(error.response.data.errors).join('\n')
                })
            }
            throw error
        }
        const onSubmit = async () => {
            if (formData.tags_id.length !== 0) {
                await httpClient
                    .post<Resource<Item>>('/items', formData, { params: { _mock: 'itemCreate' } })
                    .catch(onError)
                router.push('/items')
            } else {
                alert('未选择标签')
            }
        }

        return () => (
            <MainLayout class={style.layout}>{{
                title: () => '记一笔',
                icon: () => <Icon name="left" class={style.navIcon} />,
                default: () => <>
                    <div class={style.wrapper}>
                        <Tabs v-model:selected={formData.kind} class={style.tabs}>
                            <Tab name="支出">
                                <Tags kind='expense' v-model:selected={formData.tags_id[0]} />
                            </Tab>
                            <Tab name="收入">
                                <Tags kind='income' v-model:selected={formData.tags_id[0]} />
                            </Tab>
                        </Tabs>
                        <div class={style.inputPad_wrapper}>
                            <InputPad
                                v-model:amount={formData.amount}
                                v-model:happenAt={formData.happen_at}
                                onSubmit={onSubmit} />
                        </div>
                    </div>
                </>
            }}</MainLayout>
        )
    }
})