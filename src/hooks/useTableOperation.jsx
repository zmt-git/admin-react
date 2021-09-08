import React from 'react';
import { Space, Popconfirm } from 'antd';
import style from '../styles/operation.less';

export function useTableOperation () {
  let operations = []

  const setOperation = (arr) => {
    if (Array.isArray(arr)) {
      operations = arr
    }
  }
  const operationRender = (_, item) => {
    return (
        <Space>
          {
            operations.map(operation => (
              operation.type === 'delete' ?
                <Popconfirm
                  key={operation.type}
                  title="删除改数据将无法恢复，确认删除该条数据?"
                  onConfirm={() => operation.onClick(item)}
                >
                  <span key={operation.type} className={`${style[operation.className]} ${style.pointer}}`}>{operation.name}</span>
                </Popconfirm> :
                <span key={operation.type} className={`${style[operation.className]} ${style.pointer}}`} onClick={() => operation.onClick(item)}>{operation.name}</span>
            ))
          }
      </Space>
    )
  }

  return {
    setOperation,
    operationRender,
  }
}
