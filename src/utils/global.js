import { saveAs } from 'file-saver';
import { ElMessage, ElLoading } from 'element-plus';
import service from '@/utils/request';
import { ERROR_CODE } from '@/utils/constants';

/**
 * 时间格式化
 * @param {*} time
 * @param {*} pattern
 * @returns
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * ElForm表单重置
 * @param {*} refName
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName]?.resetFields();
  }
}

/**
 * 添加日期范围
 * @param {*} params
 * @param {*} dateRange
 * @param {*} propName
 * @returns
 */
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0];
    search.params['endTime'] = dateRange[1];
  } else {
    search.params['begin' + propName] = dateRange[0];
    search.params['end' + propName] = dateRange[1];
  }
  return search;
}

/**
 * 回显数据字典
 * @param {*} data
 * @param {*} value
 * @returns
 */
export function selectDictLabel(data, value) {
  if (value === undefined) {
    return '';
  }
  var actions = [];
  Object.keys(data).some(key => {
    if (data[key].value == '' + value) {
      actions.push(data[key].label);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
}

/**
 * 回显数据字典（字符串数组）
 * @param {*} datas
 * @param {*} value
 * @param {*} separator
 * @returns
 */
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return '';
  }
  var actions = [];
  var currentSeparator = undefined === separator ? ',' : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some(val => {
    var match = false;
    Object.keys(datas).some(key => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    });
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  });
  return actions.join('').substring(0, actions.join('').length - 1);
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + '=';
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

/**
 * 返回项目路径
 * @param {*} p
 * @returns
 */
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p;
  }
  let res = p.replace('//', '/');
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1);
  }
  return res;
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 通用下载方法
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {string} filename 生成的文件名
 * @param {object} config 其他配置信息
 * @returns
 */
export function download(url, params, filename, config) {
  const downloadLoadingInstance = ElLoading.service({
    text: '正在下载数据，请稍候',
    background: 'rgba(255, 255, 255, 0.7)',
  });
  return service
    .post(url, params, {
      transformRequest: [
        params => {
          return tansParams(params);
        },
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config,
    })
    .then(async data => {
      const isValid = await blobValidate(data);
      if (isValid) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = ERROR_CODE[rspObj.code] || rspObj.msg || ERROR_CODE['default'];
        ElMessage.error(errMsg);
      }
      downloadLoadingInstance.close();
    })
    .catch(r => {
      console.error(r);
      ElMessage.error('下载文件出现错误，请联系管理员！');
      downloadLoadingInstance.close();
    });
}
