import { defineComponent, PropType } from 'vue'
import style from './Bars.module.scss'
import { Money } from '../../shared/Money'

export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ tag: Tag; amount: number; percent: number }[]>,
    },
  },
  setup: (props, context) => {
    //随机生成颜色
    const getRandomColo = () => {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
    return () => (
      <div class={style.wrapper}>
        {props.data && props.data.length > 0 ? (
          props.data.map(({ tag, amount, percent }) => {
            return (
              <div class={style.topItem}>
                <div class={style.sign}>{tag.sign}</div>
                <div class={style.bar_wrapper}>
                  <div class={style.bar_text}>
                    <span>
                      {' '}
                      {tag.name} - {percent}%{' '}
                    </span>
                    <span>
                      {' '}
                      ￥<Money value={amount} />{' '}
                    </span>
                  </div>
                  <div class={style.bar}>
                    <div
                      class={style.bar_inner}
                      style={{ width: `${percent}%`, background: `${getRandomColo()}` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div>没有数据</div>
        )}
      </div>
    )
  },
})
