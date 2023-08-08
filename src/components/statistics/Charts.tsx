import { PropType, computed, defineComponent, onMounted, ref } from 'vue'
import style from './Charts.module.scss'
import { Dayjs } from 'dayjs'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { httpClient } from '../../shared/HttpClient'

type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]
export const Charts = defineComponent({
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
    const kind = ref('expense')
    const data1 = ref<Data1>([])
    const betterData1 = computed(() => {
      return data1.value.map(
        (item) => [item.happen_at, item.amount] as [string, number],
      )
    })

    onMounted(async () => {
      const response = await httpClient.get<{ groups: Data1; summary: number }>(
        '/items/summary',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          kind: kind.value,
          _mock: 'itemSummary',
        },
      )
      console.log('response.data')
      console.log(response.data)
      data1.value = response.data.groups
    })

    return () => (
      <div class={style.wrapper}>
        <div class={style.select}>
          <span>类型</span>
          <select
            v-model={kind.value}
            style={
              kind.value === 'expense' ? { color: 'green' } : { color: 'red' }
            }
          >
            <option value="expense" style={{ color: 'green' }}>
              支出
            </option>
            <option value="income" style={{ color: 'red' }}>
              收入
            </option>
          </select>
        </div>
        <LineChart data={betterData1.value} />
        <PieChart />
        <Bars />
      </div>
    )
  },
})
