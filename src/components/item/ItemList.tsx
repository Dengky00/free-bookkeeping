import { defineComponent } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { ItemSummary } from './ItemSummary';

export const ItemList = defineComponent({
  setup: () => {
    return () => <TimeTabsLayout component={ItemSummary} />;
  },
});
