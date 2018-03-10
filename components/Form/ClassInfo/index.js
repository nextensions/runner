import React, { Component } from 'react'
import { Form, Row, Col, Card } from 'antd'

import Class from './Class'
import Shirt from './Shirt'
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

class EducationInfo extends Component {
  state = {
    fields: {
      type: { value: '' },
      distance: { value: '' },
      size: { value: '' },
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
  render() {
    const { fields } = this.state
    // console.log(store.getState().data)
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col {...cardLayout}>
            <Card title={cardTitle('2.1', 'ประเภท และระยะทาง')} bordered={false}>
              <Class {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card title={cardTitle('2.2', 'ขนาดเสื้อที่ต้องการ')} bordered={false}>
              <Shirt {...fields} onChange={this.handleFormChange} />
            </Card>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default EducationInfo
