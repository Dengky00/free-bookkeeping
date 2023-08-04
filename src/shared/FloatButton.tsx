import { PropType, defineComponent } from 'vue'
import { Icon } from './Icon'
import style from './FloatButton.module.scss'

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={style.floatButton}>
        <Icon name={props.iconName} class={style.icon} />
      </div>
    )
  },
})
