import { defineComponent } from 'vue'
import { Center } from './Center'
import style from './ComingSoon.module.scss'
import { Icon } from './Icon'
import { MainLayout } from '../layouts/MainLayout'
import { OverLayIcon } from './OverLay'
import { RouterLink } from 'vue-router'
import { FloatButton } from './FloatButton'

export const ComingSoon = defineComponent({
  props: { name: String },
  setup: (props, context) => {
    return () => (
      <MainLayout class={style.wrapper}>
        {{
          title: () => '自由记账',
          icon: () => <OverLayIcon />,
          default: () => (
            <>
              <div>
                <Center class={style.build_wrapper}>
                  <Icon name="build" class={style.build} />
                </Center>
                <p class={style.text}>敬请期待</p>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
