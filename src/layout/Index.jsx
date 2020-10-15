import React, { Suspense, lazy } from 'react';
import { Layout, Breadcrumb, Spin, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom'
import SlideMenu from './compontents/SlideMenu'
import './Index.css'
import { getStorage } from '../utils/storage';
import { breadcrumNameMapFn } from './../utils/bread'
import menus from './../router/menus'
const Admin = lazy(() => import('./../views/user/admin'))
const Order = lazy(() => import('./../views/order/index'))
const Noper = lazy(() => import('./../views/noder/index'))
const { Header, Content, Footer, Sider } = Layout;
class Index extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    menu = (
        <Menu>
          <Menu.Item key="0">
           个人中心
          </Menu.Item>
          <Menu.Item key="1">
           修改密码
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">退出</Menu.Item>
        </Menu>
      );

    render() {
        console.log(this.props,'123')
        console.log(breadcrumNameMapFn(menus),'456')
        const breadcrumbNameMap = breadcrumNameMapFn(menus)
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
          return (
            <Breadcrumb.Item key={url}>
              <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
          );
        });
        const breadcrumbItems = [
          <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);
        return (
            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧部分 */}
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <SlideMenu />
                </Sider>
                {/* 右侧部分 */}
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <div style={{ float:'right', marginRight:16}}>
                            <Dropdown overlay={this.menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Click me <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
                            <Suspense fallback={<div style={{ position: 'fixed', top: '50%', left: '50%' }}><Spin size="large" /></div>}>
                                <Switch >
                                    <Route path='/home' component={lazy(() => import('./../views/home/index'))}></Route>
                                    <Route path='/banner' component={lazy(() => import('./../views/banner/index'))}></Route>
                                    <Route path='/order' component={lazy(() => import('./../views/order/index'))}></Route>
                                    {/* <Route path='/cart' component={lazy(() => import('./../views/cart/index'))}></Route> */}
                                    <Route path='/cart' render = { () => { //权限的判断 防止别的低等级的管理员看高管理员等级的内容
                                        return getStorage('role') >= 2 ? <Order/> : <Noper/>
                                    } } />
                                    <Route path='/pro/list' component={lazy(() => import('./../views/pro/index'))}></Route>
                                    <Route path='/pro/hot' component={lazy(() => import('./../views/pro/hot'))}></Route>
                                    <Route path='/user/list' component={lazy(() => import('./../views/user/index'))}></Route>
                                    {/* <Route path='/user/admin' component={lazy(() => import('./../views/user/admin'))}></Route> */}
                                    <Route path='/user/admin' render = { () => { //权限的判断 防止别的低等级的管理员看高管理员等级的内容,低等级跳转到无权限页面
                                        return getStorage('role') >= 2 ? <Admin/> : <Noper/>
                                    }} />
                                    <Redirect path='/pro' exact to='/pro/list'></Redirect>{/* 路由的重定向 exact为全等的判断 必须的等于/pro才跳转到list*/}
                                    <Redirect path='/user' exact to='/user/list'></Redirect>
                                </Switch>
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Index) ;
