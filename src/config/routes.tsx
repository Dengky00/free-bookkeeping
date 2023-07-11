import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";

export const routes = [
    { path: '/', redirect: '/foo' },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
]