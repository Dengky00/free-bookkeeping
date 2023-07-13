import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const ThirdActions = () => (
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/welcome/4" >下一页</RouterLink>
    <RouterLink to="/start" >跳过</RouterLink>
  </div>
)

ThirdActions.displayName = 'ThirdActions'