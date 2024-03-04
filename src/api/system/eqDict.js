import request from '@/utils/request';

// 设备字典-设备分类
export function getEqDictTypeList(params) {
  return request({
    url: '/business/eqType/list',
    params,
  });
}

// 设备字典-设备分类-新增
export function addEqDictType(data) {
  return request({
    url: '/business/eqType/save',
    method: 'post',
    data,
  });
}

// 设备字典-设备分类-修改
export function updateEqDictType(data) {
  return request({
    url: '/business/eqType/update',
    method: 'post',
    data,
  });
}

// 设备字典-设备分类-删除
export function deleteEqDictType(id) {
  return request({
    url: `/business/eqType/delete/${id}`,
  });
}

// 设备字典-设备分类-列表
export function getEqDictTypeListAll(params) {
  return request({
    url: '/business/eqDevice/list',
    params,
  });
}

// 设备字典-设备规格- 新增
export function addEqDictSpec(data) {
  return request({
    url: '/business/eqDevice/save',
    method: 'post',
    data,
  });
}

// 设备字典-设备规格- 修改
export function updateEqDictSpec(data) {
  return request({
    url: '/business/eqDevice/update',
    method: 'post',
    data,
  });
}

// 设备字典-设备规格- 删除
export function deleteEqDictSpec(id) {
  return request({
    url: `/business/eqDevice/delete/${id}`,
  });
}

// 查询所有设备字典-设备规格-列表
export function getEqDictListAll(params) {
  return request({
    url: '/business/eqType/treeList',
    params,
  });
}
