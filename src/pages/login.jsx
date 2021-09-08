import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import login from '@/styles/login.less'
import { loginRequest } from '../api/login'
import { history, connect, useModel } from 'umi'
import { setToken } from '@/utils/cache/cacheAuth'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { getAsyncRoute } from '@/utils/permission'
import { message } from 'antd'
import { patchRoutes } from '../app'

function Login (props) {
  const [loading, setLoading] = useState(false)

  const { setInitialState } = useModel('@@initialState');

  const onFinish = async (values) => {
    setLoading(true)

    await loginRequest(values)
      .then(async res => {
        setToken(res.result)

        props.dispatch({ type: 'system/setIsLogin', payload: true })

        const { routes, error } = await getAsyncRoute()

        patchRoutes({ routes: props.routes }, routes)

        setInitialState({ asyncRoutes: routes })

        if (!error) {
          history.push('/')
        } else {
          message.error('获取路由信息出错啦！')
        }

        setLoading(false)
      })
      .catch(e => {
        console.error(e)
        setLoading(false)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${login.container} center`}>
      <div className={`${login.inner}`}>
        <h3 className={login.title}>登录</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
            wrapperCol={{span: 24}}
          >
            <Input
              autoComplete='username'
              placeholder="请输入账号"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            wrapperCol={{span: 24}}
          >
            <Input.Password
              autoComplete='password'
              placeholder="请输入密码"
              prefix={<KeyOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{span: 24}}
          >
            <Button type="primary" block htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ system }) => (system))(Login)
