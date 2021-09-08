import React from 'react';
import { message } from 'antd';

export function useCRUD () {
  // form组件状态
  const [visible, setVisible] = React.useState(false)

  //form类型
  const [type, setType] = React.useState('update')

  //编辑数据
  const [record, setRecord] = React.useState()

  //赋值方法
  const setRequest = (sourceRequest, type) => {
    if (typeof sourceRequest === 'function') {
      switch (type) {
        case 'create' : createRequest = sourceRequest
          break
        case 'update' : updateRequest = sourceRequest
          break
        case 'delete' : deleteRequest = sourceRequest
          break
        default : updateRequest = sourceRequest
      }
    }
  }

  //获取方法
  const getRequest = (type) => {
    switch (type) {
      case 'create' : return createRequest
      case 'update' : return updateRequest
      case 'delete' : return deleteRequest
      default : return updateRequest
    }
  }

  // 添加api
  let createRequest = (data) => {}
  const setCreateRequest = fn => setRequest(fn, 'create')

  // 删除api
  let deleteRequest = (data) => {}
  const setDeleteRequest = fn => setRequest(fn, 'delete')

  // 更新api
  let updateRequest = (data) => {}

  const setUpdateRequest = fn => setRequest(fn)

  let beforeRequestHook = () => {}
  const setBeforeRequestHook = cb => {
    beforeRequestHook = cb;
  }

  let afterResponseHook = () => {}
  const setAfterResponseHook = cb => {
    afterResponseHook = cb;
  }

  //确认
  const onConfirm = async (data, type) => {
    beforeRequestHook()
    const request = getRequest(type)
    await request(data)
      .then(res => {
        message.success('操作成功')
      })
      .catch(e => console.log(e))
    afterResponseHook()
  }

  //取消
  const onCancel = () => {
    setVisible(false)
  }

  // 添加
  const handleCreate = () => {
    setVisible(true)
    setRecord(undefined)
    setType('create')
  }
  // 编辑
  const handleUpdate = (item) => {
    setVisible(true)
    setRecord(item)
    setType('update')
  }

  // 删除
  const handleDelete = async (item) => {
    const params = { id: item.devCode }
    await onConfirm(params, 'delete')
  }
  return {
    visible, setVisible,
    type, setType,
    record, setRecord,
    createRequest, setCreateRequest,
    deleteRequest, setDeleteRequest,
    updateRequest, setUpdateRequest,
    setRequest,
    handleCreate,
    handleDelete,
    handleUpdate,
    onConfirm,
    onCancel,
    setAfterResponseHook,
    setBeforeRequestHook
  }
}
