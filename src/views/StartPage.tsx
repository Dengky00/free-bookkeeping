import { defineComponent } from 'vue'
import style from './StartPage.module.scss'
import { Button } from '../shared/Button'
import { FloatButton } from '../shared/FloatButton'
import { Center } from '../shared/Center'
import { Icon } from '../shared/Icon'
import { OverLayIcon } from '../shared/OverLay'
import { RouterLink } from 'vue-router'
import { MainLayout } from '../layouts/MainLayout'

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout class={style.wrapper}>
        {{
          title: () => '自由记账',
          icon: () => <OverLayIcon />,
          default: () => (
            <div>
              <Center class={style.icon_wrapper}>
                <Icon name="bird" class={style.icon} />
              </Center>
              <div class={style.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={style.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
