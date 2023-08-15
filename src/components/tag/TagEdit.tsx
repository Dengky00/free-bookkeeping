import { defineComponent } from 'vue'
import style from './Tag.module.scss'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showDialog } from 'vant'
import { httpClient } from '../../shared/HttpClient'

export const TagEdit = defineComponent({
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    const onError = () => {
      showDialog({ title: '提示', message: '删除失败' })
    }
    //用户选择是否连同记账一起删除
    const onDelete = async () => {
      await showConfirmDialog({
        title: '确认',
        message: '你真的要删除标签和记账吗？',
      })
      await httpClient
        .delete(`/tags/${numberId}`, {}, { _autoLoading: true })
        .catch(onError)
      router.back()
    }

    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <Button class={style.delete} level="danger" onClick={onDelete}>
                删除标签和记账
              </Button>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
