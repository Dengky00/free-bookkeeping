import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const FourthActions = () =>
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/start" >进入应用</RouterLink>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
  </div>

FourthActions.displayName = 'FourthActions'