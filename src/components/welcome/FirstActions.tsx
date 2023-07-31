import { SkipFeatures } from '../../shared/SkipFeatures';
import style from './welcome.module.scss';
import { RouterLink } from 'vue-router';

export const FirstActions = () =>
  <div class={style.actions}>
    <SkipFeatures class={style.fake}>跳过</SkipFeatures>
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <SkipFeatures>跳过</SkipFeatures>
  </div>

FirstActions.displayName = 'FirstActions'
