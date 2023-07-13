import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import style from './Welcome.module.scss';
import logo from '../assets/icons/bird.svg'

export const Welcome = defineComponent({
    setup: () => {
        return () =>
            <div class={style.wrapper}>
                <header>
                    <img src={logo} />
                    <h1>自由记账</h1>
                </header>
                <main><RouterView name='main' /></main>
                <footer><RouterView name='footer' /></footer>
            </div>
    }
})