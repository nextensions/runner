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
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
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
      firstname: { value: '' },
      lastname: { value: '' },
      gender: { value: 'male' },
      date: { value: '' },
      month: { value: '' },
      year: { value: '' },
      religion: { value: 'พุทธ' },
      nationality: { value: 'ไทย' },
      race: { value: 'ไทย' },
      mobile: { value: '' },
      email: { value: '' },
      weight: { value: '50' },
      height: { value: '150' },
    },
  }
  componentWillMount() {
    const { data } = this.props
    this.getData(data)
  }
  getData = async (data) => {
    if (Object.keys(data).length !== 0 && data.constructor === Object) {
      if (data.hasOwnProperty('info')) {
        const { info } = data
        await this.setState({
          fields: {
            ...this.state.fields,
            firstname: { value: info.firstname || this.state.fields.firstname.value },
            lastname: { value: info.lastname || this.state.fields.lastname.value },
            gender: { value: info.gender || this.state.fields.gender.value },
            date: { value: info.date || this.state.fields.date.value },
            month: { value: info.month || this.state.fields.month.value },
            year: { value: info.year || this.state.fields.year.value },
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
        </Row>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormChange: bindActionCreators(keepData, dispatch),
})

export default connect(null, mapDispatchToProps)(RegistrantInfo)
