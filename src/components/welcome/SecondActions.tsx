import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const SecondActions = () => (
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/welcome/3" >下一页</RouterLink>
    <RouterLink to="/start" >跳过</RouterLink>
  </div>
)

SecondActions.displayName = 'SecondActions'
