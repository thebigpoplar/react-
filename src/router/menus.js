import React from 'react'
import {
    BankOutlined,
    SendOutlined,
    DeploymentUnitOutlined,
    UserAddOutlined,
    ShoppingCartOutlined,
    ScheduleOutlined,
    ProfileOutlined,
    FireOutlined,
    TeamOutlined,
    UserSwitchOutlined
} from '@ant-design/icons'

export default [
    {
        path: '/home', title: '系统首页', icon: <BankOutlined />, role: 1
    },
    {
        path: '/banner', title: '轮播图管理', icon: <SendOutlined />, role: 1
    },
    {
        path: '/pro', title: '产品管理', icon: <DeploymentUnitOutlined />, role: 1,
        children: [
            { path: '/pro/list', title: '产品列表', icon: <ProfileOutlined />, role: 1 },
            { path: '/pro/hot', title: '热推产品', icon: <FireOutlined />, role: 1 },
        ]
    },
    {
        path: '/user', title: '用户管理', icon: <UserAddOutlined />, role: 1,
        children: [
            { path: '/user/list', title: '用户列表', icon: <TeamOutlined />, role: 1 },
            { path: '/user/admin', title: '管理员列表', icon: <UserSwitchOutlined />, role: 2 },
        ]
    },
    {
        path: '/cart', title: '购物车管理', icon: <ShoppingCartOutlined />, role: 1
    },
    {
        path: '/order', title: '订单管理', icon: <ScheduleOutlined />, role: 2
    },
]