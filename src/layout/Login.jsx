import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { login } from './../api/login'
import { setStorage } from '../utils/storage'
const Login = (props) => {
    // 成功的执行函数
    const onFinish = (values) => {
        console.log(values)
        login(values).then(res => { 
            if (res.data.code === '10008') { //登录失败
                message.error('管理员账号和密码不匹配')
            } else { // 登录成功
                message.success('登录成功')
                // 登录成功将数据储存到本地
                setStorage('adminid', res.data.data.adminid)
                setStorage('adminname', res.data.data.adminname)
                setStorage('role', res.data.data.role)
                setStorage('token', res.data.data.token)
                setStorage('loginStart', true)
                //跳转到后台管理系统的首页
                props.history.push('/')
            }
            console.log(res.data.data)
        })
    }
    return (
        <Form
        style={{width:400,height:300,position:'fixed', top:'0',right:0,left:0,bottom:0, margin:'auto', padding:60, border:'1px solid black'}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="账户"
        name="adminname"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    )
}

export default Login;
