import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Radio, Divider, Tooltip, Modal, Collapse } from 'antd'
import { connect } from 'react-redux'

const Panel = Collapse.Panel

const cardLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
}

const colLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
}

class Cost extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        type: { value: '' },
        distance: { value: '' },
        size: { value: '' },
      },
    }
  }
  componentWillMount() {
    const { data } = this.props
    // this.getData(data)
  }
  getData = async (data) => {
    if (Object.keys(data).length !== 0 && data.constructor === Object) {
      if (data.hasOwnProperty('info')) {
        const { info } = data
        await this.setState({
          fields: {
            ...this.state.fields,
            type: { value: info.type || this.state.fields.type.value },
            distance: { value: info.distance || this.state.fields.distance.value },
            size: { value: info.size || this.state.fields.size.value },
          },
        })
      }
    }
  }
  handleFormChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    })
  }
  callback = (key) => {
    console.log(key)
  }

  render() {
    return (
      <Row type="flex" justify="end">
        <Col {...colLayout}>
          <Collapse defaultActiveKey={['1', '2', '3']} onChange={this.callback}>
            <Panel header="ค่าสมัครวิ่ง" key="1">
              <Row type="flex" justify="end">
                <Col span={12}>ประเภท VIP ระยะทาง 10 กิโลเมตร</Col>
                <Col span={12} align="right">
                  <strong>1,000 บาท</strong>
                </Col>
              </Row>
            </Panel>
            <Panel header="ค่าจัดส่งเสื้อ และเบอร์ BIB" key="2">
              <Row type="flex" justify="end">
                <Col span={12}>ไซต์ L (รอบอก 40") 1 ตัว</Col>
                <Col span={12} align="right">
                  <strong>65 บาท</strong>
                </Col>
              </Row>
            </Panel>
            <Panel header="รวมทั้งสิ้น" key="3">
              <Row type="flex" justify="end">
                <Col span={12} align="right">
                  <strong>1,065 บาท</strong>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

export default connect(mapStateToProps)(Cost)
