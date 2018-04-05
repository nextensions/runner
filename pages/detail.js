import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../store'
import Wrapper from '../index'

import DisplayForm from '../components/DisplayForm'
import Runner from '../components/Runner'

const {
  Header, Content, Footer, Sider,
} = Layout

class Admission extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }

  render() {
    return (
      <Wrapper>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['3']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <a href="/">แบบฟอร์มรับสมัคร</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="/instruction">ขั้นตอนการสมัคร</a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href="/detail">รายละเอียดโครงการ</a>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>แบบฟอร์มรับสมัคร</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <h2>รายละเอียดโครงการ</h2>
              <p style={{ textAlign: 'center' }}>
                <img alt="detail" style={{ width: '80%' }} src="/static/images/detail.png" />
              </p>
              หากมีข้อสงสัยกรุณาติดต่อ &nbsp;
              <a href="https://www.facbook.com/srtrunning">www.facbook.com/srtrunning</a>
            </div>
            {/* <DisplayForm /> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Runner ©2018 Created by NextSchool</Footer>
        </Layout>
      </Wrapper>
    )
  }
}

export default withRedux(initStore, state => ({ ...state }))(Admission)
