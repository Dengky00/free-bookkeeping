import { defineComponent, onMounted, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { httpClient } from '../../shared/HttpClient';
import { Button } from '../../shared/Button';

export const ItemCreate = defineComponent({
    setup: (props, context) => {
        const refKind = ref('支出')
        const refPage = ref(0)//记录已请求的页数
        const refHasMore = ref(false)//判断是否还有更多数据
        const refExpensesTags = ref<Tag[]>([])
        onMounted(async () => {
            //向服务器请求tag数据(url,请求的数据参数)
            const response = await httpClient.get<Resources<Tag>>('/tags', {
                kind: 'expenses',
                _mock: 'tagIndex',
            })
            const { resources, pager } = response.data
            refExpensesTags.value = resources//当前页数的tag数据
            refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
            console.log(refHasMore.value)
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
                            <Tab name="支出">
                                <div class={style.tags_wrapper}>
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
                                </div>
                                <div class={style.more}>
                                    {refHasMore.value ?
                                        <Button class={style.loadMore}>加载更多</Button> :
                                        <span class={style.noMore}>没有更多</span>
                                    }
                                </div>
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