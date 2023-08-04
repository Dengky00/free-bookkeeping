import { defineComponent } from 'vue'
import style from './welcome.module.scss'

export const Fourth = defineComponent({
  setup: () => {
    return () => (
      <div class={style.card}>
        <svg>
          <use xlinkHref="#cloud"></use>
        </svg>
        <h2>
          云备份
          <br />
          再也不怕数据丢失
        </h2>
      </div>
    )
  },
})
