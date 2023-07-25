import { defineComponent, PropType } from 'vue';
import style from './Tabs.module.scss';

export const Tabs = defineComponent({
    props: {
        classPrefix: {
            type: String
        },
        selected: {
            type: String as PropType<string>
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        }
    },
    setup: (props, context) => {
        return () => {
            const tabs = context.slots.default?.()
            if (!tabs) { return null }
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].type !== Tab) {
                    throw new Error('<Tabs> only accepts <Tab> as children')
                }
            }
            return (<div class={[style.tabs, props.classPrefix + '_tabs']}>
                <ol class={[style.tabs_nav, props.classPrefix + '_tabs_nav']}>
                    {tabs.map(item =>
                        <li
                            class={[item.props?.name === props.selected ? [style.selected, props.classPrefix + '_selected'] : '',
                            props.classPrefix + '_tabs_nav_item']}
                            onClick={(e) => { context.emit('update:selected', item.props?.name); props.onClick?.(e) }}
                        >
                            {item.props?.name}
                        </li>)}
                </ol>
                <div>
                    {tabs.find(item => item.props?.name === props.selected)}
                </div>
            </div>)
        }
    }
})

export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div>{context.slots.default?.()}</div>
        )
    }
})