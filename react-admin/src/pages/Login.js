import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import axios from '../axios'

function Login() {
  const [form] = Form.useForm()
  const history = useHistory()
  // 校验通过才执行
  const onFinish = values => {
    console.log('获取form表单的数据: ', values)
    axios.postJson('/login', values).then(res => {
      console.log('登录返回了', res)
      if (res.code !== 200) return message.error(res.msg)
      console.log('注册了', res)
      localStorage.setItem('token', res.body.access_token)
      localStorage.setItem('userInfo', res.body.userInfo)
      history.push('/blogList/0')
    })
  }
  const register = () => {
    form.validateFields().then(values => {
      if (values) {
        axios.postJson('/register', values).then(res => {
          if (res.code !== 200) return message.error(res.msg)
          localStorage.setItem('token', res.body.access_token)
          localStorage.setItem('userInfo', res.body.userInfo)
          history.push('/blogList/0')
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: '请输入邮箱!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="email"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
      </Form.Item>

      <Form.Item>
        <Button
          style={{ marginRight: '20px' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          登录
        </Button>
        <Button type="warn" onClick={register} className="login-form-button">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
