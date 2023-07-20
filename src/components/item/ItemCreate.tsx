import { defineComponent, PropType, ref } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';

export const ItemCreate = defineComponent({
    // props: {
    //     name: {
    //         type: String as PropType<string>
    //     },
    // },
    setup: (props, context) => {
        const kind = ref('支出')
        return () => (
            <MainLayout class={style.wrapper}>
                {{
                    title: () => '记一笔',
                    icon: () => <Icon name='left' />,
                    default: () =>
                        <>
                            {/* <Tabs selected={kind.value} onUpdateSelected={name => kind.value = name}> */}
                            <Tabs v-model:selected={kind.value}>
                                <Tab name="支出">icon列表1</Tab>
                                <Tab name="收入">icon列表2</Tab>
                            </Tabs>
                            <div class={style.inputPad_wrapper}>
                                <InputPad />
                            </div>
                        </>
                }}
            </MainLayout>
        )
    }
})