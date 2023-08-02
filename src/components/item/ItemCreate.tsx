import { defineComponent, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { Tags } from './Tags';

export const ItemCreate = defineComponent({
    setup: (props, context) => {
        const refKind = ref('支出')
        return () => (
            <MainLayout class={style.layout}>{{
                title: () => '记一笔',
                icon: () => <Icon name="left" class={style.navIcon} />,
                default: () => <>
                    <div class={style.wrapper}>
                        <Tabs v-model:selected={refKind.value} class={style.tabs}>
                            <Tab name="支出">
                                <Tags kind='expense' />
                            </Tab>
                            <Tab name="收入">
                                <Tags kind='income' />
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