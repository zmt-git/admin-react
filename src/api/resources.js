import request from '@/utils/http/request';

// GET /resourceManager/getRoute
// 获取用户路由

export function getRoute () {
  return request({
    url: '/resourceManager/getRoute',
    method: 'GET',
  })
}