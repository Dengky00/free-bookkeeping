import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const FourthActions = () =>
  <div class={style.actions}>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/start" >开始记账</RouterLink>
    <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
  </div>

FourthActions.displayName = 'FourthActions'