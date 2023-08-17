import { PropType, computed, defineComponent, onMounted, ref, watch } from 'vue'
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
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]
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
    const kind = ref('expenses')
    //data1折线图数据
    const data1 = ref<Data1>([])
    const betterData1 = computed<[string, number][]>(() => {
      const duration = dayjs.duration(props.endDate.diff(props.startDate)).asDays() //时间区间天数
      return Array.from({ length: duration }).map((_, i) => {
        const time = props.startDate.add(i, 'day').format('YYYY-MM-DD')
        const item = data1.value[0]
        const amount = item && item.happen_at === time ? data1.value.shift()!.amount : 0
        return [time, amount]
      })
    })
    const fetchData1 = async () => {
      const response = await httpClient.get<{ groups: Data1; summary: number }>(
        '/items/summary',
        {
          happen_after: props.startDate.format('YYYY-MM-DD'),
          happen_before: props.endDate.format('YYYY-MM-DD'),
          kind: kind.value,
          group_by: 'happen_at',
        },
        {
          _mock: 'itemSummary',
          _autoLoading: true,
        },
      )
      data1.value = response.data.groups.reverse()
    }
    onMounted(fetchData1)
    watch(() => kind.value, fetchData1)
    //data2饼图和条形图数据
    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount,
      })),
    )
    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100),
      }))
    })
    const fetchData2 = async () => {
      const response = await httpClient.get<{ groups: Data2; summary: number }>(
        '/items/summary',
        {
          happen_after: props.startDate.format('YYYY-MM-DD'),
          happen_before: props.endDate.format('YYYY-MM-DD'),
          kind: kind.value,
          group_by: 'tag_id',
        },
        {
          _mock: 'itemSummary',
        },
      )
      data2.value = response.data.groups
    }
    onMounted(fetchData2)
    watch(() => kind.value, fetchData2)

    return () => (
      <div class={style.wrapper}>
        <div class={style.select}>
          <span>类型</span>
          <select
            v-model={kind.value}
            style={kind.value === 'expenses' ? { color: 'green' } : { color: 'red' }}
          >
            <option value="expenses" style={{ color: 'green' }}>
              支出
            </option>
            <option value="income" style={{ color: 'red' }}>
              收入
            </option>
          </select>
        </div>
        <LineChart data={betterData1.value} />
        <PieChart data={betterData2.value} />
        <Bars data={betterData3.value} />
      </div>
    )
  },
})
