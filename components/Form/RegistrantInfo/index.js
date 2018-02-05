import React, { Component } from 'react'
import { Form, Row, Col, Card } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { keepData, fetchData } from '../../../actions'
import { initStore } from '../../../store'
import Info from './Info'
import Address from './Address'

const { Meta } = Card

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

class RegistrantInfo extends Component {
  state = {
    fields: {
      firstname: { value: '12' },
      lastname: { value: '' },
      gender: { value: '' },
      blood: { value: '' },
      religion: { value: '' },
      nationality: { value: 'ไทย' },
      race: { value: 'ไทย' },
      mobile: { value: '' },
      email: { value: '' },
      weight: { value: '' },
      height: { value: '' },
      address: { value: '' },
      moo: { value: '14' },
      soi: { value: '' },
      street: { value: '' },
      presentAddress: { value: '' },
      presentMoo: { value: '' },
      presentSoi: { value: '' },
      presentStreet: { value: '' },
    },
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    const { data } = this.props

    if (Object.keys(data).length !== 0 && data.constructor === Object) {
      if (data.hasOwnProperty('info')) {
        const { info } = data
        this.setState({
          fields: {
            ...this.state.fields,
            firstname: { value: info.firstname || this.state.fields.firstname.value },
            lastname: { value: info.lastname || this.state.fields.lastname.value },
            gender: { value: info.gender || this.state.fields.gender.value },
            blood: { value: info.blood || this.state.fields.blood.value },
            religion: { value: info.religion || this.state.fields.religion.value },
            nationality: { value: info.nationality || this.state.fields.nationality.value },
            race: { value: info.race || this.state.fields.race.value },
            mobile: { value: info.mobile || this.state.fields.mobile.value },
            email: { value: info.email || this.state.fields.email.value },
            weight: { value: info.weight || this.state.fields.weight.value },
            height: { value: info.height || this.state.fields.height.value },
          },
        })
      }
      if (data.hasOwnProperty('address')) {
        const { address } = data
        this.setState({
          fields: {
            ...this.state.fields,
            address: { value: address.address || this.state.fields.address.value },
            moo: { value: address.moo || this.state.fields.moo.value },
            soi: { value: address.soi || this.state.fields.soi.value },
            street: { value: address.street || this.state.fields.street.value },
          },
        })
      }
      if (data.hasOwnProperty('presentAddress')) {
        const { presentAddress } = data
        this.setState({
          fields: {
            ...this.state.fields,
            presentAddress: { value: presentAddress.presentAddress || this.state.fields.presentAddress.value },
            presentMoo: { value: presentAddress.presentMoo || this.state.fields.presentMoo.value },
            presentSoi: { value: presentAddress.presentSoi || this.state.fields.presentSoi.value },
            presentStreet: { value: presentAddress.presentStreet || this.state.fields.presentStreet.value },
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
            <Card title={cardTitle('1.1', 'ข้อมูลส่วนตัวของนักเรียน')} bordered={false}>
              <Info {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card title={cardTitle('1.2', 'ข้อมูลที่อยู่ของนักเรียน')} bordered={false}>
              <Address {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormChange: bindActionCreators(keepData, dispatch),
})

export default connect(null, mapDispatchToProps)(RegistrantInfo)
