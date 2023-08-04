import { PropType, defineComponent } from 'vue';
import style from './Center.module.scss';

const directionMap = {
  '-': 'horizontal',
  '|': 'vertical',
  horizontal: 'horizontal',
  vertical: 'vertical',
};
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,
      default: '-',
    },
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction];
    return () => (
      <div class={[style.center, extraClass]}>{context.slots.default?.()}</div>
    );
  },
});
