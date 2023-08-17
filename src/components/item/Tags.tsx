import { defineComponent, PropType, ref } from 'vue'
import { Button } from '../../shared/Button'
import { httpClient } from '../../shared/HttpClient'
import { Icon } from '../../shared/Icon'
import { useTags } from '../../shared/useTags'
import style from './Tags.module.scss'
import { RouterLink, useRouter } from 'vue-router'

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ['update:selected'],

  setup: (props, context) => {
    const router = useRouter()
    //分页加载标签
    const { tags, hasMore, fetchTags } = useTags((page) => {
      return httpClient.get<Resources<Tag>>(
        '/tags',
        {
          kind: props.kind,
          page: page + 1,
        },
        {
          _mock: 'tagIndex',
          _autoLoading: true,
        },
      )
    })
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    //长按标签跳转
    const onLongPress = (tagId: Tag['id']) => {
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`)
    }
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress(tag.id)
      }, 1000)
    }
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }
    //绑定在基础页面上判断用户长按范围
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY,
      )
      if (
        currentTag.value !== pointedElement &&
        !currentTag.value?.contains(pointedElement)
      ) {
        clearTimeout(timer.value)
      }
    }

    return () => (
      <>
        <div class={style.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={style.tag}>
            <div class={style.sign}>
              <Icon name="add" class={style.createTag} />
            </div>
            <div class={style.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[style.tag, props.selected === tag.id ? style.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={style.sign}>{tag.sign}</div>
              <div class={style.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={style.more}>
          {hasMore.value ? (
            <Button class={style.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={style.noMore}>没有更多</span>
          )}
        </div>
      </>
    )
  },
})
