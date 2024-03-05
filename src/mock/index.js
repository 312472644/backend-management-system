import request from '@/utils/request';

export function getMockProvinceData() {
  return request({
    url: 'https://mock.mengxuegu.com/mock/65e708228ecfd33cdfbd688d/grace/random-data',
  });
}
