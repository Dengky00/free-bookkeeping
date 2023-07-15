import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const FirstActions = () =>
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <RouterLink to="/start" >跳过</RouterLink>
  </div>

FirstActions.displayName = 'FirstActions'
