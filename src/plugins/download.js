import axios from 'axios';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import { getToken } from '@/utils/auth';
import { ERROR_CODE } from '@/utils/constants';
import { blobValidate } from '@/utils/global';

const baseURL = import.meta.env.VITE_APP_BASE_API;

export default {
  zip(urlParams, name) {
    var url = baseURL + urlParams;
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { Authorization: 'Bearer ' + getToken() },
    }).then(async res => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' });
        this.saveAs(blob, name);
      } else {
        this.printErrMsg(res.data);
      }
    });
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = ERROR_CODE[rspObj.code] || rspObj.msg || ERROR_CODE['default'];
    ElMessage.error(errMsg);
  },
};
