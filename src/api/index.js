import request from '@/utils/request';

// 附件上传
export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data,
  });
}

// md编辑器附件上传
export function uploadMdFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
}

// 获取动态审批表单
export function getDynamicApprovalForm(id) {
  return request({
    url: '/danny/task/formDataShow/' + id,
  });
}

// 提交动态审批表单
export function submitDynamicApprovalForm(taskID, data) {
  return request({
    url: '/danny/task/formDataSave/' + taskID,
    method: 'post',
    data: data,
  });
}

// 获取审批历史
export function getApprovalHistory(id) {
  return request({
    url: '/danny/historyFromData/ByInstanceId/' + id,
  });
}

// 获取已办任务列表
export function getDoneTaskList(params) {
  return request({
    url: '/task/completedTasksList',
    params,
  });
}
