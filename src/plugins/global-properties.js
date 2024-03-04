import { useDict } from '@/utils/dict';
import { download } from '@/utils/global';
import {
  parseTime,
  resetForm,
  addDateRange,
  handleTree,
  selectDictLabel,
  selectDictLabels,
} from '@/utils/global';

export default {
  install: app => {
    app.config.globalProperties.useDict = useDict;
    app.config.globalProperties.download = download;
    app.config.globalProperties.parseTime = parseTime;
    app.config.globalProperties.resetForm = resetForm;
    app.config.globalProperties.addDateRange = addDateRange;
    app.config.globalProperties.handleTree = handleTree;
    app.config.globalProperties.selectDictLabel = selectDictLabel;
    app.config.globalProperties.selectDictLabels = selectDictLabels;
  },
};
