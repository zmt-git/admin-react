import request from '../utils/http/request';

export function getList () {
  return request({
    url: '/user/list',
    method: 'POST'
  })
}
