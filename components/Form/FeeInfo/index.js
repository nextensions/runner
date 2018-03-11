import React, { Component } from 'react'
import { Form, Row, Col, Card } from 'antd'
import { connect } from 'react-redux'

import Shipping from './Shipping'
import Cost from './Cost'
// import Address from './Address'

const cardLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
}

const cardTitle = (step, title) => (
  <div className="ant-steps-item ant-steps-item-process">
    <div className="ant-steps-item-tail" />
    <div className="ant-steps-item-icon">
      <span className="ant-steps-icon">{step}</span>
    </div>
    <div className="ant-steps-item-content">
      <div className="ant-steps-item-title">{title}</div>
    </div>
  </div>
)

class FeeInfo extends Component {
  state = {
    fields: {
      shipmethod: { value: '' },
      distance: { value: '' },
      size: { value: '' },
      address: { value: '' },
      moo: { value: '' },
      soi: { value: '' },
      street: { value: '' },
      subDistrict: { value: '' },
      district: { value: '' },
      province: { value: '' },
      zipcode: { value: '' },
    },
  }
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { data } = this.props
    this.getData(data)
  }
  getData = async (data) => {
    if (Object.keys(data).length !== 0 && data.constructor === Object) {
      if (data.hasOwnProperty('address')) {
        const { address, info } = data
        await this.setState({
          fields: {
            ...this.state.fields,
            shipmethod: { value: info.shipmethod || this.state.fields.shipmethod.value },
            address: { value: address.address || this.state.fields.address.value },
            moo: { value: address.moo || this.state.fields.moo.value },
            soi: { value: address.soi || this.state.fields.soi.value },
            street: { value: address.street || this.state.fields.street.value },
            subDistrict: { value: address.subDistrict || this.state.fields.subDistrict.value },
            district: { value: address.district || this.state.fields.district.value },
            province: { value: address.province || this.state.fields.province.value },
            zipcode: { value: address.zipcode || this.state.fields.zipcode.value },
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
  render() {
    const { fields } = this.state

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col {...cardLayout}>
            <Card title={cardTitle('3.1', 'วิธีจัดส่งเสื้อ และเบอร์ BIB')} bordered={false}>
              <Shipping {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card title={cardTitle('3.2', 'สรุปค่าใช้จ่ายที่ต้องชำระ')} bordered={false}>
              <Cost {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

export default connect(mapStateToProps)(FeeInfo)
