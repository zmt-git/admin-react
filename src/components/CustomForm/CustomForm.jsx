import React, { useState, useMemo } from 'react';
import QueueAnim  from 'rc-queue-anim';
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col, Space, PageHeader  } from 'antd';
import moment from 'moment'
import { formatTime } from '../../utils/dateTool'
import style from './CustomForm.less';
const { Option } = Select;

export default function CustomForm (props) {
  const { type, columns, record } = props

  const generateField = () => {
    const formData = {}
    if (type === 'create') {
      for (const column of columns) {
        if (column.editable) formData[column.dataIndex] = null
      }
    } else {
      for (const column of columns) {
        if (column.editable) {
          if (column.formType === 'DatePicker') {
            formData[column.dataIndex] = moment(formatTime(record[column.dataIndex]), 'yyyy-MM-dd hh:mm:ss');
          } else {
            formData[column.dataIndex] = record[column.dataIndex];
          }
        }
      }
    }

    return formData
  }

  const [formData] = useState(generateField())

  const getOptions = (options) => {
    return options.map(option => {
      return <Option value={option.value} key={option.value}>{option.label}</Option>
    })
  }

  const getFormNode = (item) => {
    if (item.formType === 'InputNumber') {
      return <InputNumber  />
    } else if (item.formType === 'Select') {
      return <Select>
        {getOptions(item.options)}
      </Select>
    } else if (item.formType === 'DatePicker') {
      return <DatePicker showTime />
    } else {
      return <Input />
    }
  }

  const FormItems = (columns) => {
    return columns.map(item => {
      if (item.editable) {
        return (<Form.Item name={item.dataIndex} label={item.title} key={item.dataIndex}>{getFormNode(item)}</Form.Item>)
      } else {
        return false
      }
    })
  }

  const onCancel = () => {
    props.onCancel()
  }

  const onFinish = (data) => {
    // todo 判断数据是否变化
    props.onCancel()

    props.onConfirm(data, type)
  }

  const onConfirm = () => {
    // todo 判断数据是否变化
    // props.onCancel()
    //
    // props.onConfirm(formData, type)
  }

  const title = useMemo(function() {
    const str = type === 'create' ? '添加' : '编辑'

    return type === 'create' ? str : `${str}${props.record ? props.record.devCode : ''}`

  }, [type, props.record])

  const subTitle = useMemo(function() {
    return type === 'create' ? '' : props.record.location
  }, [type, props.record])

  return (
      <div className={style.form}>
        <PageHeader
          className={style.title}
          onBack={onCancel}
          title={title}
          subTitle={subTitle}
        />
        <Row className={style.row}>
          <Col xxl={8} xl={12} lg={20} md={24}>
            <QueueAnim delay={300} className="queue-simple">
              <Form
                labelCol={{span: 5}}
                initialValues={formData}
                onFinish={onFinish}
              >
                {FormItems(columns, record)}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type='primary' onClick={onConfirm} htmlType={'submit'}>确认</Button>
                  <Button type='default' onClick={onCancel}>取消</Button>
                </Form.Item>
              </Form>
            </QueueAnim>

          </Col>
        </Row>
      </div>
  )
}
