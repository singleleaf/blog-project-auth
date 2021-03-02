/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons'

import styled from 'styled-components'
import routes from '../router/index'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
const Title = styled.div`
  font-size: 20px;
  color: white;
`
const Logout = styled.div`
  font-size: 14px;
  color: white;
  cursor: pointer;
`

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.sate = {
      menu: [
        {
          icon: LaptopOutlined,
          name: '博客管理',
          // path: '/blogList/0',
          children: [
            { name: '新建博客', path: '/listDetail' },
            { name: '已发布', path: '/blogList/0' },
            { name: '已放入草稿箱', path: '/blogList/1' },
            { name: '已删除', path: '/blogList/2' }
          ]
        },
        {
          icon: NotificationOutlined,
          name: '标签管理',
          children: [{ name: '编辑标签', path: '/tagList' }]
        },
        {
          icon: UserOutlined,
          name: '分类管理',
          children: [{ name: '编辑分类', path: '/categoryList' }]
        }
      ]
    }
  }

  logout = () => {
    this.props.history.push('/login')
    localStorage.removeItem('token')
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <Row>
            <Col span={8}>
              {' '}
              <Title>博客管理后台</Title>
            </Col>
            <Col span={2} offset={14}>
              <Logout onClick={this.logout}>退出登录</Logout>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['0-1']}
              defaultOpenKeys={['0']}
            >
              {this.sate.menu.map((item, i) => {
                return (
                  <SubMenu key={i} icon={<item.icon />} title={item.name}>
                    {item.children.map((itemx, j) => {
                      return (
                        <Menu.Item key={`${i}-${j}`}>
                          <Link to={itemx.path}>{itemx.name}</Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Content>
              <Switch>
                {routes.map(route => {
                  return (
                    <Route
                      component={route.component}
                      path={route.path}
                      key={route.path}
                    />
                  )
                })}
                <Redirect exact from="/" to={routes[0].path} />
                {/* 这里用 redirect 进行 首页自动跳转到 /home 路由下
                exact 意味着精确匹配 当为 / 时才跳转 /home 不是包含 / 就跳转到 /home
            */}
                <Redirect to="/404" />
                {/* 如果找不到页面 则去 4040页面 */}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Index)
