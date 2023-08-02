import { defineComponent, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { httpClient } from '../../shared/HttpClient';
import { Button } from '../../shared/Button';
import { useTags } from '../../shared/useTags';

export const ItemCreate = defineComponent({
    setup: (props, context) => {
        const refKind = ref('支出')
        const { tags: expenseTags, hasMore: moreExpense, fetchTags: fetchExpense } = useTags((page) => {
            return httpClient.get<Resources<Tag>>('/tags', {
                kind: 'expense',
                page: page + 1,
                _mock: 'tagIndex',
            })
        })
        const { tags: incmoeTags, hasMore: moreIncome, fetchTags: fetchIncome } = useTags((page) => {
            return httpClient.get<Resources<Tag>>('/tags', {
                kind: 'income',
                page: page + 1,
                _mock: 'tagIndex',
            })
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
                                    {expenseTags.value.map(tag =>
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
                                    {moreExpense.value ?
                                        <Button class={style.loadMore} onClick={fetchExpense}>加载更多</Button> :
                                        <span class={style.noMore}>没有更多</span>
                                    }
                                </div>
                            </Tab>
                            <Tab name="收入">
                                <div class={style.tags_wrapper}>
                                    <div class={style.tag}>
                                        <div class={style.sign}>
                                            <Icon name="add" class={style.createTag} />
                                        </div>
                                        <div class={style.name}>
                                            新增
                                        </div>
                                    </div>
                                    {incmoeTags.value.map(tag =>
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
                                    {moreIncome.value ?
                                        <Button class={style.loadMore} onClick={fetchIncome}>加载更多</Button> :
                                        <span class={style.noMore}>没有更多</span>
                                    }
                                </div>
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