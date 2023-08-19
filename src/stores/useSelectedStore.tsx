import { defineStore } from 'pinia'

type SelectedStore = {
  kind: 'expenses' | 'income'
  overlay: String
}
export const useSeletedStore = defineStore<string, SelectedStore>('selected', {
  state: () => ({ kind: 'expenses', overlay: '记账' }),
  actions: {
    changeKind(kind: 'expenses' | 'income') {
      this.kind = kind
    },
    changeOverLay(overlay: string) {
      this.overlay = overlay
    },
  },
})
