import { defineComponent, PropType } from 'vue';
import { Button } from '../../shared/Button';
import { httpClient } from '../../shared/HttpClient';
import { Icon } from '../../shared/Icon';
import { useTags } from '../../shared/useTags';

import style from './Tags.module.scss';
export const Tags = defineComponent({
    props: {
        kind: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup: (props, context) => {
        const { tags, hasMore, fetchTags } = useTags((page) => {
            return httpClient.get<Resources<Tag>>('/tags', {
                kind: props.kind,
                page: page + 1,
                _mock: 'tagIndex'
            })
        })
        return () => <>
            <div class={style.tags_wrapper}>
                <div class={style.tag}>
                    <div class={style.sign}>
                        <Icon name="add" class={style.createTag} />
                    </div>
                    <div class={style.name}>
                        新增
                    </div>
                </div>
                {tags.value.map(tag =>
                    <div class={[style.tag, style.selected]}>
                        <div class={style.sign}>
                            {tag.sign}
                        </div>
                        <div class={style.name}>
                            {tag.name}
                        </div>
                    </div>
                )}
            </div>
            <div class={style.more}>
                {hasMore.value ?
                    <Button class={style.loadMore} onClick={fetchTags}>加载更多</Button> :
                    <span class={style.noMore}>没有更多</span>
                }
            </div>
        </>
    }
})