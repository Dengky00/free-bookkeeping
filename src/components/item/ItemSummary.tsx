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
                <ul class={style.total}>
                    <li><span>收入</span><span>128</span></li>
                    <li><span>支出</span><span>99</span></li>
                    <li><span>净收入</span><span>39</span></li>
                </ul>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
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
                            <div class={style.time}>
                                2000-01-01 12:39
                            </div>
                        </div>
                    </li>
                </ol>
                <div class={style.more}>向下滑动加载更多</div>
                <FloatButton iconName='add' />
            </div>
        )
    }
})