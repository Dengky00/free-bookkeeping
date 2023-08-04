import { Dayjs } from 'dayjs';
import style from './ItemSummary.module.scss';
import { defineComponent, PropType } from 'vue';
import { FloatButton } from '../../shared/FloatButton';

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
    return () => (
      <div class={style.wrapper}>
        <table class={style.total}>
          <tr>
            <td>支出</td>
            <td>收入</td>
            <td>净收入</td>
          </tr>
          <tr>
            <td>12345678.12</td>
            <td>12345678.12</td>
            <td>12345678.12</td>
          </tr>
        </table>
        <ol class={style.list}>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
          <li>
            <div class={style.sign}>
              <span>X</span>
            </div>
            <div class={style.text}>
              <div class={style.tagAndAmount}>
                <span class={style.tag}>旅行</span>
                <span class={style.amount}>￥1234</span>
              </div>
              <div class={style.time}>2000-01-01 12:39</div>
            </div>
          </li>
        </ol>
        <div class={style.more}>向下滑动加载更多</div>
        <FloatButton iconName="add" />
      </div>
    );
  },
});
