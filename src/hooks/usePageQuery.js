import { clearObjectValue } from '@/utils';
import request from '@/utils/request';

/**
 * 配置项类型定义
 * @typedef  {object} ConfigType
 * @property {string} url 接口请求地址
 * @property {object} queryForm // 表格查询对象
 * @property {object} extraParams // 额外查询对象
 * @property {boolean} showPage // 是否需要分页查询
 * @property {object} pageConfig // 分页参数查询属性名称
 * @property {string} pageConfig.pageIndexProp // 页码属性名称
 * @property {string} pageConfig.pageSizeProp // 页码属性名称
 */

/**
 * 返回结果类型定义
 * @typedef {object} ResultType
 * @property {object} methods 方法对象
 * @property {string} methods.getTableData // 获取表格数据方法
 * @property {string} methods.handlePageChange // 分页索引方法
 * @property {string} methods.handleSizeChange // 分页页面方法
 * @property {string} methods.handleQueryForm // 表格查询方法
 * @property {string} methods.handleResetForm // 表格重置方法
 * @property {object} data // 数据对象
 * @property {Array} data.tableData // 表格数据
 * @property {boolean} data.tableLoading // loading
 * @property {number} data.dataTotal // 数据总条数
 * @property {object} data.pageVO // 分页对象
 * @property {number} data.pageVO.current // 分页索引
 * @property {number} data.pageVO.size // 分页页码
 */

const mergeConfig = config => {
  const defaultConfig = {
    queryForm: {},
    extraParams: {},
    showPage: true,
    pageConfig: {
      pageIndexProp: 'current',
      pageSizeProp: 'size',
    },
  };
  return {
    ...defaultConfig,
    ...config,
  };
};

/**
 *
 * @param {ConfigType} config
 * @returns {ResultType}
 */
export const usePageQuery = config => {
  const { pageConfig, queryForm, extraParams, showPage, url } = mergeConfig(config);
  const { pageIndexProp, pageSizeProp } = pageConfig;

  const tableData = ref([]);
  const tableLoading = ref(false);
  const dataTotal = ref(0);

  const pageVO = ref({
    current: 1,
    size: 10,
  });

  const getQueryParams = () => {
    let params = { ...extraParams, ...queryForm };
    if (showPage) {
      const { current, size } = pageVO.value;
      params = { ...params, ...{ [pageIndexProp]: current, [pageSizeProp]: size } };
    }
    return params;
  };

  const handleQueryForm = () => {
    pageVO.value.current = 1;
    getTableData();
  };

  const handleResetForm = () => {
    clearObjectValue(queryForm);
    pageVO.value.current = 1;
    getTableData();
  };

  const handlePageChange = val => {
    pageVO.value.current = val;
    getTableData();
  };

  const handleSizeChange = val => {
    pageVO.value.current = 1;
    pageVO.value.size = val;
    getTableData();
  };

  const getTableData = () => {
    if (!url) {
      throw new Error('表格请求地址不能为空！');
    }
    const params = getQueryParams();
    tableLoading.value = true;
    request({ url, params })
      .then(res => {
        const { projects } = res.data;
        tableData.value = projects;
      })
      .finally(() => {
        tableLoading.value = false;
      });
  };

  return {
    methods: {
      getTableData,
      handlePageChange,
      handleSizeChange,
      handleQueryForm,
      handleResetForm,
    },
    data: {
      tableData,
      tableLoading,
      dataTotal,
      pageVO,
    },
  };
};
