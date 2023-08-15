//额外的自定义类型声明
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
  kind: 'expenses' | 'income'
}
type Item = {
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  kind: 'expenses' | 'income'
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
type User = {
  id: number
  email: string
}

type FormErrors<T> = { [K in keyof typeof T]: string[] }
