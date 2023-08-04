import { defineComponent } from 'vue';
import style from './Tag.module.scss';
import { Icon } from '../../shared/Icon';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { TagForm } from './TagForm';

export const TagEdit = defineComponent({
  setup: () => {
    return () => (
      <MainLayout>
        {{
          title: () => '标签详情',
          icon: () => <Icon name="left" />,
          default: () => (
            <>
              <TagForm />
              <div class={style.actions}>
                <Button level="danger">删除标签</Button>
                <Button level="danger">删除记账</Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
