/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 判断是否为https|ftps协议地址
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 判断是否是小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 判断是否是大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 判断是否是大小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 判断是否是邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 判断是否是字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 判断是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 校验是否是正整数
 * @param {*} str
 * @returns
 */
export function isInteger(str) {
  const reg = /^[1-9]\d*$/;
  return reg.test(str);
}

/**
 * 支持小数点后n位
 * @param {*} str
 * @param {*} num
 * @returns
 */
export function isNumber(str, num = 4) {
  const reg = new RegExp(`^\\d+(\\.\\d{1,${num}})?$`);
  return reg.test(str);
}

/**
 * 校验IP地址
 * @param {*} str
 * @returns
 */
export function isIP(str) {
  const reg =
    /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/;
  return reg.test(str);
}

/**
 * 首字母大写
 * @param {*} str
 * @returns
 */
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

/**
 * 下划转驼峰
 * @param {*} str
 * @returns
 */
export function camelCase(str) {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}

/**
 * 是否是数字字符串
 * @param {*} str
 * @returns
 */
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}
