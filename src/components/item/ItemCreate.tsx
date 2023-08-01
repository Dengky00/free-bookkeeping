import { defineComponent, onMounted, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { httpClient } from '../../shared/HttpClient';

export const ItemCreate = defineComponent({
    setup: (props, context) => {
        const refKind = ref('支出')
        const refExpensesTags = ref<Tag[]>([])
        onMounted(async () => {
            const response = await httpClient.get<{ resources: Tag[] }>('/tags', {
                kind: 'expenses',
                _mock: 'tagIndex',
            })
            refExpensesTags.value = response.data.resources
        })
        const refIncomeTags = ref<Tag[]>([])
        onMounted(async () => {
            const response = await httpClient.get<{ resources: Tag[] }>('/tags', {
                kind: 'income',
                _mock: 'tagIndex',
            })
            refIncomeTags.value = response.data.resources
        })

        return () => (
            <MainLayout class={style.layout}>{{
                title: () => '记一笔',
                icon: () => <Icon name="left" class={style.navIcon} />,
                default: () => <>
                    <div class={style.wrapper}>
                        <Tabs v-model:selected={refKind.value} class={style.tabs}>
                            <Tab name="支出" class={style.tags_wrapper}>
                                <div class={style.tag}>
                                    <div class={style.sign}>
                                        <Icon name="add" class={style.createTag} />
                                    </div>
                                    <div class={style.name}>
                                        新增
                                    </div>
                                </div>
                                {refExpensesTags.value.map(tag =>
                                    <div class={[style.tag, style.selected]}>
                                        <div class={style.sign}>
                                            {tag.sign}
                                        </div>
                                        <div class={style.name}>
                                            {tag.name}
                                        </div>
                                    </div>
                                )}
                            </Tab>
                            <Tab name="收入" class={style.tags_wrapper}>
                                <div class={style.tag}>
                                    <div class={style.sign}>
                                        <Icon name="add" class={style.createTag} />
                                    </div>
                                    <div class={style.name}>
                                        新增
                                    </div>
                                </div>
                                {refIncomeTags.value.map(tag =>
                                    <div class={[style.tag, style.selected]}>
                                        <div class={style.sign}>
                                            {tag.sign}
                                        </div>
                                        <div class={style.name}>
                                            {tag.name}
                                        </div>
                                    </div>
                                )}
                            </Tab>
                        </Tabs>
                        <div class={style.inputPad_wrapper}>
                            <InputPad />
                        </div>
                    </div>
                </>
            }}</MainLayout>
        )
    }
})