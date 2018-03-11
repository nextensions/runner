import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip, Upload, Icon, message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { runnerType, shirtSize } from '../../../config/'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Dragger = Upload.Dragger

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

class Payment extends Component {
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
    const { data } = this.props.state
    const runningFee = runnerType.filter(type => type.name === data.info.type)[0]
    const runningShirtInfo = shirtSize.filter(shirt => shirt.size === data.info.size)[0]
    const shippingFee = 65
    const gender = [{ en: 'male', th: 'ชาย' }, { en: 'female', th: 'หญิง' }]

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <Row type="flex" justify="end">
            <Col span={12}>
              <strong style={{ fontSize: 22 }}>ยอดที่ต้องชำระ</strong>
            </Col>
            <Col span={12} align="right">
              <strong style={{ fontSize: 22 }}>
                {(runningFee.fee + shippingFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}{' '}
                บาท
              </strong>
            </Col>
          </Row>

          <Dragger {...this.props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">คลิกหรือลากไฟล์มายังพื้นที่นี้เพื่ออัปโหลด</p>
            <p className="ant-upload-hint">
              ไฟล์รูปภาพหลักฐานการโอนเงินขนาดไม่เกิน 5MB.
            </p>
          </Dragger>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

export default connect(mapStateToProps)(Payment)
