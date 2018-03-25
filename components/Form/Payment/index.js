import React, { Component } from 'react'
import { Form, Row, Col, Card, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Payment from './Payment'
import Summary from './Summary'
import Term from './Term'
// import Address from './Address'

const FormItem = Form.Item

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

class PaymentInfo extends Component {
  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
  }

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
      agreement: { value: '' },
    },
  }
  handleFormChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    })
  }
  inputChange = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }
  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { fields } = this.state
    // console.log(store.getState().data)
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col {...cardLayout}>
            <Card title={cardTitle('4.1', 'ยืนยันข้อมูลผู้สมัคร')} bordered={false}>
              <Summary {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card title={cardTitle('4.2', 'โอนเงินและแนบหลักฐานการชำระเงิน')} bordered={false}>
              <Payment {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
          <Col {...cardLayout} style={{ marginTop: '20px' }}>
            <Card title={cardTitle('4.3', 'คำรับรองของผู้สมัคร')} bordered={false}>
              <Term {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
})(connect(null, mapDispatchToProps)(PaymentInfo))
