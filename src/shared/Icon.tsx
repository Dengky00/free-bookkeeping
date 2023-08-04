import { PropType, defineComponent } from 'vue'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props) => {
    return () => (
      <svg onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  },
})
