import { FunctionalComponent } from 'vue';
import style from './WelcomeLayout.module.scss'

export const WelcomeLayout: FunctionalComponent =
    (props, { slots: { icon, title, buttons } }) => (
        <div class={style.wrapper}>
            <div class={style.card}>
                {icon?.()}
                {title?.()}
            </div>
            <div class={style.actions}>
                {buttons?.()}
            </div>
        </div>
    )