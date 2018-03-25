import React, { Component } from 'react'
import { Form, Row, Col, Card } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { keepData, fetchData } from '../../../actions'
import { initStore } from '../../../store'
import Info from './Info'

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
      citizen: { value: '' },
      email: { value: '' },
      mobile: { value: '' },
      gender: { value: '' },
      age: { value: '' },
      date: { value: '' },
      month: { value: '' },
      year: { value: '' },
      emer_person: { value: '' },
      emer_contact: { value: '' },
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
      if (data.hasOwnProperty('info')) {
        const { info } = data
        await this.setState({
          fields: {
            ...this.state.fields,
            firstname: { value: info.firstname || this.state.fields.firstname.value },
            lastname: { value: info.lastname || this.state.fields.lastname.value },
            citizen: { value: info.citizen || this.state.fields.citizen.value },
            email: { value: info.email || this.state.fields.email.value },
            mobile: { value: info.mobile || this.state.fields.mobile.value },
            gender: { value: info.gender || this.state.fields.gender.value },
            age: { value: info.age || this.state.fields.age.value },
            date: { value: info.date || this.state.fields.date.value },
            month: { value: info.month || this.state.fields.month.value },
            year: { value: info.year || this.state.fields.year.value },
            emer_person: { value: info.emer_person || this.state.fields.emer_person.value },
            emer_contact: { value: info.emer_contact || this.state.fields.emer_contact.value },
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
            <Card
              title={cardTitle('1.1', 'ข้อมูลส่วนตัว และผู้ติดต่อกรณีฉุกเฉิน')}
              bordered={false}
            >
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
