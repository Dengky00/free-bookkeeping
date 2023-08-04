import { defineComponent } from 'vue'
import style from './welcome.module.scss'

export const First = defineComponent({
  setup: () => {
    return () => (
      <div class={style.card}>
        <svg>
          <use xlinkHref="#money"></use>
        </svg>
        <h2>
          会挣钱
          <br />
          还会省钱
        </h2>
      </div>
    )
  },
})
