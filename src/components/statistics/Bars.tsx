import { computed, defineComponent, PropType, reactive } from 'vue'
import style from './Bars.module.scss'

export const Bars = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const betterData3 = computed(() => {
      const total = data3.reduce((sum, item) => sum + item.amount, 0)
      return data3.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100) + '%',
      }))
    })
    return () => (
      <div class={style.wrapper}>
        {betterData3.value.map(({ tag, amount, percent }) => {
          return (
            <div class={style.topItem}>
              <div class={style.sign}>{tag.sign}</div>
              <div class={style.bar_wrapper}>
                <div class={style.bar_text}>
                  <span>
                    {' '}
                    {tag.name} - {percent}{' '}
                  </span>
                  <span> ￥{amount} </span>
                </div>
                <div class={style.bar}>
                  <div class={style.bar_inner}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
})
