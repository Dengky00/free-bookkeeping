import { defineStore } from 'pinia'

type SelectedStore = {
  kind: 'expenses' | 'income'
  overlay: String
}
type SelectedActions = {
  changeKind: (kind: 'expenses' | 'income') => void
  changeOverLay: (overlay: string) => void
}
export const useSeletedStore = defineStore<string, SelectedStore, {}, SelectedActions>(
  'selected',
  {
    state: () => ({ kind: 'expenses', overlay: '记账' }),
    actions: {
      changeKind(kind) {
        this.kind = kind
      },
      changeOverLay(overlay) {
        this.overlay = overlay
      },
    },
  },
)
