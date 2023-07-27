import { PropType, defineComponent, ref } from 'vue';
import style from './Charts.module.scss';
import { Dayjs } from 'dayjs';
import { FormItem } from '../../shared/Form';

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
        const category = ref('expense')
        return () => (
            <div class={style.wrapper}>
                <div class={style.select}>
                    <span>类型</span>
                    <select v-model={category.value} style={category.value === 'expense' ? { color: 'green' } : { color: 'red' }}>
                        <option value="expense" style={{ color: 'green' }}>支出</option>
                        <option value="income" style={{ color: 'red' }}>收入</option>
                    </select>
                </div>
                {/* <FormItem label='类型' type="select"
                    v-model={category.value} class={style.select}
                    options={[
                        { value: 'expense', text: '支出' },
                        { value: 'income', text: '收入' },
                    ]} /> */}
            </div >
        )
    }
})