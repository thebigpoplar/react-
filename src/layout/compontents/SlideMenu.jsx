import React, { Component } from 'react'
import { Menu } from 'antd'
import { withRouter } from "react-router-dom"
import menus from './../../router/menus'
import { getStorage } from './../../utils/storage'
const { SubMenu } = Menu
class Com extends Component {
    renderMenu = (menus) => {//递归函数实现多级菜单的渲染
        return menus.map(item => {
         if (getStorage('role') >= item.role) {  //如果用户的权限大于等于渲染的权限就渲染,否者就跳过//也就意味着权限不够就不显示
            if (item.children) {
                return (
                    <SubMenu key={item.path} icon={item.icon} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path} icon={item.icon}>
                        {item.title}
                    </Menu.Item>
                )
            }
          } else {
              return null
          }
        })
    }
    changeRouter = (obj) => {
        console.log(obj)
        console.log(this.props)
        this.props.history.push(obj.key)
    }
    render() {
        const pathname = this.props.location.pathname
        const openKeyStar = '/' + pathname.split('/')[1]
        console.log(openKeyStar)
        return (
            <Menu theme="dark" mode="inline" onClick={this.changeRouter} defaultOpenKeys={[openKeyStar]} defaultSelectedKeys={[pathname]}>
                { this.renderMenu(menus)}
                {/* {//但列表的渲染,如果是多级菜单的话用递归函数
                    menus.map(item => (
                        <Menu.Item key={item.path} icon={item.icon}>
                            {item.title}
                        </Menu.Item>
                    ))
                } */}

                {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                    </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />} /> */}
            </Menu>
        )
    }
}

export default withRouter(Com)