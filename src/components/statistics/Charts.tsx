import { PropType, computed, defineComponent, onMounted, ref } from 'vue'
import style from './Charts.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { httpClient } from '../../shared/HttpClient'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration) //dayjs引入计算时长插件

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
    const betterData1 = computed<[string, number][]>(() => {
      const duration = dayjs.duration(props.endDate.diff(props.startDate)).asDays() //时间区间天数
      return Array.from({ length: duration }).map((_, i) => {
        const time = props.startDate.add(i, 'day').toISOString()
        const item = data1.value[0]
        const amount = item && item.happen_at === time ? data1.value.shift()!.amount : 0
        return [time, amount]
      })
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
      data1.value = response.data.groups
    })

    return () => (
      <div class={style.wrapper}>
        <div class={style.select}>
          <span>类型</span>
          <select
            v-model={kind.value}
            style={kind.value === 'expense' ? { color: 'green' } : { color: 'red' }}
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
