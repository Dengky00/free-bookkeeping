import { SkipFeatures } from '../../shared/SkipFeatures'
import style from './welcome.module.scss'
import { RouterLink } from 'vue-router'

export const SecondActions = () => (
  <div class={style.actions}>
    <SkipFeatures class={style.fake}>跳过</SkipFeatures>
    <RouterLink to="/welcome/3">下一页</RouterLink>
    <SkipFeatures>跳过</SkipFeatures>
  </div>
)

SecondActions.displayName = 'SecondActions'
