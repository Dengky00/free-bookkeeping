import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export const SkipFeatures = defineComponent({
  setup: (props, context) => {
    return () => (
      <RouterLink to="/items">
        <span onClick={() => localStorage.setItem('skipFeatures', 'yes')}>跳过</span>
      </RouterLink>
    )
  },
})
