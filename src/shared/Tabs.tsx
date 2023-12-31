import { defineComponent, inject, PropType } from 'vue'
import style from './Tabs.module.scss'

export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String,
    },
    selected: {
      type: String as PropType<string>,
    },
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const rerenderOnSelect = inject('rerenderOnSelect') //从外部组件注入的数据
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) {
        return null
      }
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children')
        }
      }
      return (
        <div class={[style.tabs, props.classPrefix + '_tabs']}>
          <ol class={[style.tabs_nav, props.classPrefix + '_tabs_nav']}>
            {tabs.map((item) => (
              <li
                class={[
                  item.props?.value === props.selected
                    ? [style.selected, props.classPrefix + '_selected']
                    : '',
                  props.classPrefix + '_tabs_nav_item',
                ]}
                onClick={() => {
                  context.emit('update:selected', item.props?.value)
                }}
              >
                {item.props?.name}
              </li>
            ))}
          </ol>
          {rerenderOnSelect ? (
            <div key={props.selected}>
              {tabs.find((item) => item.props?.value === props.selected)}
            </div>
          ) : (
            <div>
              {tabs.map((item) => (
                <div v-show={item.props?.value === props.selected}>{item}</div>
              ))}
            </div>
          )}
        </div>
      )
    }
  },
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => <div>{context.slots.default?.()}</div>
  },
})
