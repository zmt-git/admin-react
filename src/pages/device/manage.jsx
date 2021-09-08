import React from 'react';

export default function () {
  const [name] = React.useState('1')

  return (
    <div className="manage">设备管理manage: {name}</div>
  )
}
