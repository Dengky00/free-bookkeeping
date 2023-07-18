import { defineComponent, PropType } from 'vue';
import style from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';

export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <MainLayout class={style.wrapper}>
                {{
                    title: () => '记一笔',
                    icon: () => <Icon name='left' />
                }}
            </MainLayout>
        )
    }
})