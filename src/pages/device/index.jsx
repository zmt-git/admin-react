import React from 'react'
import { Table, Button } from 'antd'
import { connect, useSelector } from 'umi'
import { usePage } from '../../hooks/usePage'
import { useCRUD } from '../../hooks/useCRUD';
import { useTableOperation } from '../../hooks/useTableOperation'
import { getDeviceList, createDevice, deleteDevice, updateDevice } from '../../api/device'
import CustomForm from '../../components/CustomForm/CustomForm'
import { formatTime } from '../../utils/dateTool'

function DeviceLists (props) {
  let {pageSizeOptions,
    pageSize,
    pageList,
    pageTotal,
    pageCurrent,
    pageLoading,
    setPageLoading,
    onChange,
    getPageList,
    setPageRequest,
  } = usePage()

  const {
    type,
    record,
    visible,
    onCancel,
    onConfirm,
    handleUpdate,
    handleDelete,
    handleCreate,
    setUpdateRequest,
    setDeleteRequest,
    setCreateRequest,
    setAfterResponseHook,
    setBeforeRequestHook
  } = useCRUD()

  setBeforeRequestHook(() => {
    setPageLoading(true)
  })

  setAfterResponseHook(async () => {
    getPageList()
    setPageLoading(false)
  })

  let { setOperation, operationRender } = useTableOperation()

  setOperation([
    {type: 'update', name: '编辑', className: 'update', onClick: handleUpdate },
    {type: 'delete', name: '删除', className: 'delete', onClick: handleDelete },
  ])

  setPageRequest(getDeviceList)
  setCreateRequest(createDevice)
  setDeleteRequest(deleteDevice)
  setUpdateRequest(updateDevice)

  const { types: { numType: visNums } } = useSelector(state => state)

  React.useEffect(async (a) => {
    await getPageList()
  }, [props])

  const formatVisNum = (_, item) => {
    const target = visNums.find(i => i.value === item.visNum)
    return target ? target.label : ''
  }

  const createTimeRender = (_, item) => {
    return <span>{formatTime(item.createTime)}</span>
  }

  const columns = [
    { title: "设备编码", dataIndex: "devCode", key: "devCode", editable: true },
    { title: "安装位置", dataIndex: "location", key: "location", editable: true  },
    { title: "协议类型", dataIndex: "conType", key: "conType", editable: true  },
    { title: "数量", dataIndex: "leadNum", key: "leadNum", editable: true, formType: 'InputNumber' },
    { title: "数量2", dataIndex: "visNum", key: "visNum", editable: true, formType: 'Select', options: visNums, render: formatVisNum },
    { title: "创建时间", dataIndex: "createTime", key: "createTime", editable: true, formType: 'DatePicker', render: createTimeRender },
    { title: "操作", dataIndex: "operation", key: "operation", editable: false, render: operationRender },
  ]

  return (
    <div>
      <Button type='primary' onClick={handleCreate}>添加</Button>
      <Table
        loading={pageLoading}
        dataSource={pageList}
        rowKey='devCode'
        columns={columns}
        pagination={{position: ['bottomLeft'], total: pageTotal, pageSize: pageSize, current: pageCurrent, showQuickJumper: true, pageSizeOptions }}
        onChange={onChange}
      />
      {visible ? <CustomForm type={type} record={record} columns={columns} onCancel={onCancel} onConfirm={onConfirm}/> : null}
    </div>
  )
}

export default connect(({ types }) => types)(DeviceLists)
