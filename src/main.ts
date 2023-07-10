import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import { App } from './App'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'

const routes = [
    { path: '/', redirect: '/foo' },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
