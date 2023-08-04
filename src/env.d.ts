/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}

type JSONValue =
  | null
  | boolean
  | string
  | number
  | JSONValue[]
  | Record<string, JSONValue>
type Tag = {
  id: number
  user_id: number
  name: string
  sign: string
  kind: expense | income
}
type Item = {
  id: number
  user_id: number
  tags_id: number[]
  amount: string
  happen_at: string
  kind: expenses | income
}
type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
type Resource<T> = {
  resource: T
}
type ResourceError = {
  errors: Record<string, string[]>
}
