/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 对象深拷贝
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 生成唯一的字符串
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * 网页全屏
 * @param {HTMLElement} element
 */
export function requestFullScreen(element) {
  const dom = element || document.documentElement;
  if (dom.requestFullscreen) {
    dom.requestFullscreen();
  } else if (dom.mozRequestFullScreen) {
    dom.mozRequestFullScreen();
  } else if (dom.webkitRequestFullscreen) {
    dom.webkitRequestFullscreen();
  } else if (dom.msRequestFullscreen) {
    dom.msRequestFullscreen();
  }
}

/**
 * 退出全屏
 * @param {HTMLElement} element
 */
export function exitFullScreen(element) {
  const dom = element || document;
  if (dom.exitFullscreen) {
    dom.exitFullscreen();
  } else if (dom.mozCancelFullScreen) {
    dom.mozCancelFullScreen();
  } else if (dom.webkitExitFullscreen) {
    dom.webkitExitFullscreen();
  } else if (dom.msExitFullscreen) {
    dom.msExitFullscreen();
  }
}

/**
 * 清除对象的值
 * @param {object} target // 目标对象
 */
export function clearObjectValue(target) {
  if (!target) return;
  if (Object.keys(target)?.length === 0) return;
  for (const prop in target) {
    const value = target[prop];
    if (typeof value === 'string' || value instanceof Date) {
      target[prop] = '';
    } else if (typeof value === 'number') {
      target[prop] = 0;
    } else if (typeof value === 'boolean') {
      target[prop] = false;
    } else if (Array.isArray(value)) {
      target[prop] = [];
    } else if (typeof value === 'object') {
      clearObjectValue(value);
    }
  }
}
