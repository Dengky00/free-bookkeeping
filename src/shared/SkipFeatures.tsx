import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export const SkipFeatures = defineComponent({
  // props: {
  //     to: {
  //         type: String as PropType<RouteLocationRaw>,
  //         required: true,
  //     }
  // },
  setup: (props, context) => {
    return () => (
      // <RouterLink to={`/${props.to}`} >{context.slots.default?.()}</RouterLink>
      <RouterLink to="/start">
        <span onClick={() => localStorage.setItem('skipFeatures', 'yes')}>
          跳过
        </span>
      </RouterLink>
    );
  },
});
