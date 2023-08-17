import style from './TimeTabsLayout.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import { PropType, defineComponent, provide, reactive, ref } from 'vue'
import { Overlay, showDialog } from 'vant'
import { MainLayout } from './MainLayout'
import { OverLayIcon } from '../shared/OverLay'
import { Tab, Tabs } from '../shared/Tabs'
import { Form, FormItem } from '../shared/Form'
//外部属性的组件类型
const demo = defineComponent({
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
})

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
    rerenderOnSelect: {
      type: Boolean,
      default: false,
    },
    hideThisYear: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    provide('rerenderOnSelect', props.rerenderOnSelect) //provide和inject爷孙数据传递
    const refSelected = ref('本月')
    //时间区间左右全闭[x,y]
    const timeList = {
      thisMonth: {
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month'),
      },
      lastMonth: {
        start: dayjs().subtract(1, 'month').startOf('month'),
        end: dayjs().subtract(1, 'month').endOf('month'),
      },
      thisYear: {
        start: dayjs().startOf('year'),
        end: dayjs().endOf('year'),
      },
    }
    const startVant = ref([
      dayjs().format('YYYY'),
      dayjs().format('MM'),
      dayjs().format('DD'),
    ])
    const endVant = ref([
      dayjs().format('YYYY'),
      dayjs().format('MM'),
      dayjs().format('DD'),
    ])
    //用于存储用户为点击取消确认时的临时时间
    let tempTime = {
      startVant: [dayjs().format('YYYY'), dayjs().format('MM'), dayjs().format('DD')],
      endVant: [dayjs().format('YYYY'), dayjs().format('MM'), dayjs().format('DD')],
    }
    const customTime = reactive({
      start: dayjs(),
      end: dayjs(),
    })
    const refOverlayVisible = ref(false)
    const showOverlay = () => {
      if (refSelected.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    }
    //取消自定义时间
    const onCancel = () => {
      startVant.value = tempTime.startVant
      endVant.value = tempTime.endVant
      refOverlayVisible.value = false
    }
    //确认自定义时间
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      if (
        parseInt(startVant.value[0] + startVant.value[1] + startVant.value[2]) >
        parseInt(endVant.value[0] + endVant.value[1] + endVant.value[2])
      ) {
        showDialog({ title: '提示', message: '开始时间应不大于结束时间' })
        return
      }
      tempTime.startVant = startVant.value
      tempTime.endVant = endVant.value
      Object.assign(customTime, {
        start: dayjs(
          startVant.value[0] + '-' + startVant.value[1] + '-' + startVant.value[2],
        ),
        end: dayjs(endVant.value[0] + '-' + endVant.value[1] + '-' + endVant.value[2]),
      })
      refOverlayVisible.value = false
    }

    return () => (
      <MainLayout>
        {{
          title: () => '自由记账',
          icon: () => <OverLayIcon />,
          //由于项目初期只想到按天显示折线图,导致按年统计时折线图过于密集,所以可以取消今年选项
          default: () => (
            <>
              {props.hideThisYear ? (
                <Tabs
                  v-model:selected={refSelected.value}
                  onUpdate:selected={showOverlay}
                >
                  <Tab value="本月" name="本月">
                    <props.component
                      startDate={timeList.thisMonth.start}
                      endDate={timeList.thisMonth.end}
                    />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component
                      startDate={timeList.lastMonth.start}
                      endDate={timeList.lastMonth.end}
                    />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
              ) : (
                <Tabs
                  v-model:selected={refSelected.value}
                  onUpdate:selected={showOverlay}
                >
                  <Tab value="本月" name="本月">
                    <props.component
                      startDate={timeList.thisMonth.start}
                      endDate={timeList.thisMonth.end}
                    />
                  </Tab>
                  <Tab value="上月" name="上月">
                    <props.component
                      startDate={timeList.lastMonth.start}
                      endDate={timeList.lastMonth.end}
                    />
                  </Tab>
                  <Tab value="今年" name="今年">
                    <props.component
                      startDate={timeList.thisYear.start}
                      endDate={timeList.thisYear.end}
                    />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
              )}
              <Overlay show={refOverlayVisible.value} class={style.overlay}>
                <div class={style.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem label="开始时间" v-model={startVant.value} type="date" />
                      <FormItem label="结束时间" v-model={endVant.value} type="date" />
                      <FormItem>
                        <div class={style.actions}>
                          <button type="button" onClick={onCancel}>
                            取消
                          </button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
