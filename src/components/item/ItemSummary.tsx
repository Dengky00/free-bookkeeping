import { Dayjs } from 'dayjs'
import style from './ItemSummary.module.scss'
import { defineComponent, PropType, reactive, watch } from 'vue'
import { FloatButton } from '../../shared/FloatButton'
import { httpClient } from '../../shared/HttpClient'
import { Button } from '../../shared/Button'
import { Money } from '../../shared/Money'
import dayjs from 'dayjs'
import { RouterLink } from 'vue-router'
import { Center } from '../../shared/Center'
import { Icon } from '../../shared/Icon'
import { useAfterMe } from '../../hooks/useAfterMe'
import { useItemStore } from '../../stores/useItemStore'

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: Dayjs as PropType<Dayjs>,
      required: true,
    },
    endDate: {
      type: Dayjs as PropType<Dayjs>,
      required: true,
    },
  },
  setup: (props, context) => {
    //请求记账记录
    const itemStore = useItemStore([
      'items',
      props.startDate.format('YYYY-MM-DD'),
      props.endDate.format('YYYY-MM-DD'),
    ])
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))

    //请求收支总情况
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    })
    const fetchItemsBalance = async () => {
      const response = await httpClient.get(
        '/items/balance',
        {
          happen_after: props.startDate.format('YYYY-MM-DD'),
          happen_before: props.endDate.format('YYYY-MM-DD'),
        },
        {
          _mock: 'itemIndexBalance',
        },
      )
      Object.assign(itemsBalance, response.data)
    }
    useAfterMe(fetchItemsBalance)

    //请求自定义时间范围内记账记录
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.$reset()
        itemStore.fetchItems(props.startDate, props.endDate)
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        })
        fetchItemsBalance()
      },
    )

    return () => (
      <div class={style.wrapper}>
        {itemStore.items && itemStore.items.length > 0 ? (
          <>
            <table class={style.total}>
              <tr>
                <td>支出</td>
                <td>收入</td>
                <td>净收入</td>
              </tr>
              <tr>
                <td>
                  -<Money value={itemsBalance.expenses} />
                </td>
                <td>
                  +<Money value={itemsBalance.income} />
                </td>
                <td>
                  <Money value={itemsBalance.balance} />
                </td>
              </tr>
            </table>
            <ol class={style.list}>
              {itemStore.items.map((item) => (
                <li>
                  <div class={style.sign}>
                    <span>
                      {item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}
                    </span>
                  </div>
                  <div class={style.text}>
                    <div class={style.tagAndAmount}>
                      <span class={style.tag}>
                        {item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}
                      </span>
                      <span
                        style={
                          item.kind === 'expenses'
                            ? { color: '#008000' }
                            : { color: '#ff0000' }
                        }
                      >
                        {item.kind === 'expenses' ? '-' : '+'}￥
                        <Money value={item.amount} />
                      </span>
                    </div>
                    <div class={style.time}>
                      {dayjs(item.happen_at).format('YYYY-MM-DD')}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={style.more}>
              {itemStore.hasMore ? (
                <Button
                  onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}
                >
                  加载更多
                </Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <>
            <Center class={style.icon_wrapper} direction='|'>
              <Icon name="bird" class={style.icon} />
              <p>目前没有数据</p>
            </Center>
            <div class={style.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={style.button}>开始记账</Button>
              </RouterLink>
            </div>
          </>
        )}
        <RouterLink to="/items/create">
          <FloatButton iconName="add" />
        </RouterLink>
      </div>
    )
  },
})