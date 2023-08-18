import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export const ItemPage = defineComponent({
  props: { name: String },
  setup: (props, context) => {
    return () => <RouterView />
  },
})
export default ItemPage
