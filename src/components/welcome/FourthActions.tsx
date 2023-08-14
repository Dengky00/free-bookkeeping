import { SkipFeatures } from '../../shared/SkipFeatures'
import style from './welcome.module.scss'
import { RouterLink } from 'vue-router'

export const FourthActions = () => (
  <div class={style.actions}>
    <SkipFeatures class={style.fake} />
    <RouterLink to="/items">
      <span onClick={() => localStorage.setItem('skipFeatures', 'yes')}>进入应用</span>
    </RouterLink>
    <SkipFeatures class={style.fake} />
  </div>
)

FourthActions.displayName = 'FourthActions'
