import { Dayjs } from 'dayjs'
import style from './ItemSummary.module.scss'
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { FloatButton } from '../../shared/FloatButton'
import { httpClient } from '../../shared/HttpClient'
import { Button } from '../../shared/Button'
import { Money } from '../../shared/Money'
import dayjs from 'dayjs'

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
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)
    const fetchItems = async () => {
      const response = await httpClient.get<Resources<Item>>('/items', {
        happen_after: props.startDate.format('YYYY-MM-DD'),
        happen_before: props.endDate.format('YYYY-MM-DD'),
        page: page.value + 1,
        _mock: 'itemIndex',
      })
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    onMounted(fetchItems)
    //请求收支总情况
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    })
    onMounted(async () => {
      const response = await httpClient.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance',
      })
      Object.assign(itemsBalance, response.data)
    })

    return () => (
      <div class={style.wrapper}>
        {items.value ? (
          <>
            <table class={style.total}>
              <tr>
                <td>支出</td>
                <td>收入</td>
                <td>净收入</td>
              </tr>
              <tr>
                <td>
                  -<Money value={itemsBalance.income} />
                </td>
                <td>
                  +<Money value={itemsBalance.expenses} />
                </td>
                <td>
                  <Money value={itemsBalance.balance} />
                </td>
              </tr>
            </table>
            <ol class={style.list}>
              {items.value.map((item) => (
                <li>
                  <div class={style.sign}>
                    <span>{item.tags_id[0]}</span>
                  </div>
                  <div class={style.text}>
                    <div class={style.tagAndAmount}>
                      <span class={style.tag}>{item.tags_id[0]}</span>
                      <span class={style.amount}>
                        ￥<Money value={item.amount} />
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
              {hasMore.value ? (
                <Button onClick={fetchItems}>加载更多</Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <div>记录为空</div>
        )}
        <FloatButton iconName="add" />
      </div>
    )
  },
})
