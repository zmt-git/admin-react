import request from '@/utils/http/request';

export function getDeviceList (data) {
  return request({
    url: '/device/list',
    method: 'POST',
    data
  })
}

export function updateDevice(data) {
  return request({
    url: '/device/update',
    method: 'PUT',
    data
  })
}

export function createDevice(data) {
  return request({
    url: '/device/create',
    method: 'POST',
    data
  })
}

export function deleteDevice(params) {
  return request({
    url: '/device/delete',
    method: 'DELETE',
    params
  })
}

export function getNumTypesR () {
  return request({
    url: '/device/numTypes',
    method: 'GET',
  })
}
