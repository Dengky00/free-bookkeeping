
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>
type Tag = {
    id: number,
    user_id: number,
    name: string,
    sign: string,
    kind: expense | income,
}

type Resources<T = any> = {
    resources: T[],
    pager: {
        page: number,
        per_page: number,
        count: number,
    },
}