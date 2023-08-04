import { defineComponent } from 'vue'
import style from './Tag.module.scss'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
import { useRoute } from 'vue-router'

export const TagEdit = defineComponent({
  setup: () => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={style.actions}>
                <Button level="danger">删除标签</Button>
                <Button level="danger">删除记账</Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
