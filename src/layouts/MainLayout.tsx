import { defineComponent } from 'vue';
import style from './MainLayout.module.scss';
import { NavBar } from '../shared/NavBar';

export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.wrapper}>
        <NavBar class={style.navbar}>
          {{
            icon: () => context.slots.icon?.(),
            title: () => context.slots.title?.(),
          }}
        </NavBar>
        {context.slots.default?.()}
      </div>
    );
  },
});
