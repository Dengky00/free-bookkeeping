import { defineComponent, PropType, reactive } from 'vue';
import style from './TagCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';

export const TagCreate = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            name: '',
            sign: '',
        })
        return () => (
            <MainLayout>
                {{
                    title: () => '新建标签',
                    icon: () => <Icon name='left' />,
                    default: () => (
                        <form class={style.form}>
                            <div class={style.formRow}>
                                <label class={style.formLabel}>
                                    <span class={style.formItem_name}>标签名</span>
                                    <div class={style.formItem_value}>
                                        <input v-model={formData.name} class={[style.formItem, style.input, style.error]}></input>
                                    </div>
                                    <div class={style.formItem_errorHint}>
                                        <span>必填</span>
                                    </div>
                                </label>
                            </div>
                            <div class={style.formRow}>
                                <label class={style.formLabel}>
                                    <span class={style.formItem_name}>符号 {formData.sign}</span>
                                    <div class={style.formItem_value}>
                                        <EmojiSelect v-model={formData.sign} class={[style.formItem, style.emojiList, style.error]} />
                                    </div>
                                    <div class={style.formItem_errorHint}>
                                        <span>必填</span>
                                    </div>
                                </label>
                            </div>
                            <p class={style.tips}>记账时长按标签即可进行编辑</p>
                            <div class={style.formRow}>
                                <div class={style.formItem_value}>
                                    <Button class={[style.formItem, style.button]}>确定</Button>
                                </div>
                            </div>
                        </form>
                    )
                }}
            </MainLayout>
        )
    }
})