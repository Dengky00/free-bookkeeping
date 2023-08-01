
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>