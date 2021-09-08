/**
 * @description表格分页
 * */
import React from 'react'

export function usePage () {
  const pageSizeOptions = [10,20,50,100]
  // 分页 条数
  const [pageSize, setPageSize] = React.useState(10)

  // 分页 当前页
  const [pageCurrent, setPageCurrent] = React.useState(1)

  // 分页 请求参数 params
  const [pageParams, setPageParams] = React.useState({})

  // 分页 加载状态
  const [pageLoading, setPageLoading] = React.useState(false)

  // 分页 请求参数 data
  const [pageData, setPageData] = React.useState({ size: pageSize, current: pageCurrent })

  // 分页 数据
  const [pageList, setPageList] = React.useState([])

  // 分页 总条数
  const [pageTotal, setPageTotal] = React.useState(0)

  // 分页 请求
  let pageRequest = (parameter) => {}

  const setPageRequest = (fn) => {
    if (typeof fn === 'function') {
      pageRequest = fn
    }
  }

  // 获取分页数据
  const getPageList = (parameter = getPageParameter(), onInterceptorsResponse) => {
    if (typeof pageRequest !== 'function') {
      return
    }

    return pageRequest(parameter)
      .then(res => {
        let result = res.result

        if (onInterceptorsResponse) {
          result = onInterceptorsResponse(res)
        }
        setPageList(result.records)
        setPageCurrent(result.current)
        setPageSize(result.size)
        setPageTotal(result.total)
      })
      .catch(e => console.log(e))
  }

  // 设置分页请求参数
  const getPageParameter = (params = {}, data = {}) => {
    setPageData({ size: pageSize, current: pageCurrent})

    const dataAssign = Object.assign(pageData, data)

    const paramsAssign = Object.assign(pageParams, params)

    return { params: paramsAssign, data: dataAssign }
  }

  // 分页chang
  const onChange = async (page) => {
    setPageCurrent(page.current)

    setPageSize(page.pageSize)

    getPageParameter({}, { size: page.pageSize, current: page.current})

    setPageLoading(true)
    await getPageList()
    setPageLoading(false)
  }

  return {
    pageSizeOptions,
    pageList, setPageList,
    pageLoading, setPageLoading,
    pageTotal, setPageTotal,
    pageSize, setPageSize,
    pageCurrent, setPageCurrent,
    pageData, setPageData,
    pageParams, setPageParams,
    onChange,
    setPageRequest,
    getPageList,
    getPageParameter,
  }
}

