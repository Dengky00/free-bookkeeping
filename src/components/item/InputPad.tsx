import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import style from './InputPad.module.scss';
import { Icon } from '../../shared/Icon';
import dayjs from 'dayjs';
import { DatePicker, Popup } from 'vant';
import 'vant/lib/index.css';

export const InputPad = defineComponent({
  props: {
    amount: String,
    happenAt: String,
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const refAmount = ref(''); //用户输入金额
    const refDate = ref([
      dayjs().format('YYYY'),
      dayjs().format('MM'),
      dayjs().format('DD'),
    ]); //vant的DatePicker接受数组形式的年月日
    const vantDate = ref(refDate.value); //暂存DatePicker中用户未确定时的日期
    const showDate = computed(() => {
      //展示在页面上的日期
      if (
        dayjs().format('YYYY-MM-DD') ===
        refDate.value[0] + '-' + refDate.value[1] + '-' + refDate.value[2]
      ) {
        return '今天';
      } else {
        return (
          refDate.value[0] + '-' + refDate.value[1] + '-' + refDate.value[2]
        );
      }
    });

    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const inputContent = (e: Event) => {
      //记账输入方法
      const button = e.target as HTMLButtonElement;
      const input = button.textContent!;
      if (button.id === 'delete' || button.nodeName === 'svg') {
        //删除按钮
        refAmount.value = refAmount.value.slice(0, -1);
      } else if (button.id === 'ok') {
        //ok提交按钮
        if (
          refAmount.value &&
          refAmount.value !== '0' &&
          refAmount.value !== '0.'
        ) {
          context.emit('update:amount', refAmount.value);
          context.emit('update:happenAt', showDate.value);
          refAmount.value = '';
          props.onSubmit?.();
        }
      } else {
        if (refAmount.value === '' && input === '.') {
          return;
        }
        if (refAmount.value.indexOf('.') >= 0 && input === '.') {
          return;
        }
        if (refAmount.value === '0') {
          if (input === '.') {
            refAmount.value += input;
          } else {
            refAmount.value = input;
          }
        } else {
          if (/^\d{0,8}(\.\d{0,2})?$/.test(refAmount.value + input)) {
            //整数最多8位，小数最多2位
            refAmount.value += input;
          }
        }
      }
    };
    onMounted(() => {
      const numPad = document.querySelectorAll('.buttons>button');
      numPad.forEach((button) => {
        button.addEventListener('click', (e) => {
          inputContent(e);
        });
      });
    });

    return () => (
      <div class={style.numberPad}>
        <div class={style.dateAndAmount}>
          <div>
            <span class={style.date} onClick={showDatePicker}>
              <Icon name="date" class={style.icon} />
              {showDate.value}
            </span>
            <Popup
              position="bottom"
              v-model:show={refDatePickerVisible.value}
              onClickOverlay={() => {
                vantDate.value = refDate.value;
              }}
            >
              <DatePicker
                v-model={vantDate.value}
                title="选择日期"
                onConfirm={() => {
                  refDate.value = vantDate.value;
                  hideDatePicker();
                }}
                onCancel={() => {
                  vantDate.value = refDate.value;
                  hideDatePicker();
                }}
              />
            </Popup>
          </div>
          <div
            class={[style.amount, refAmount.value === '' ? style.empty : '']}
          >
            <div>{refAmount.value}</div>
          </div>
        </div>

        <div class={[style.buttons, 'buttons']}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button class={style.delete} id="delete">
            <Icon name="backspace" class={style.icon} />
          </button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button class={style.ok} id="ok">
            OK
          </button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button class={style.zero}>0</button>
          <button class={style.point}>.</button>
        </div>
      </div>
    );
  },
});
