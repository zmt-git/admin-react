import request from '@/utils/http/request';

export function loginRequest (params) {
  return request({
    url: '/system/login',
    method: 'POST',
    params
  })
}

export function getName() {
  return request({
    url: '/system/getName',
    method: 'GET',
  })
}
