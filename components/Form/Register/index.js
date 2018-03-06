import React, { Component } from 'react'
import { Steps, Button, message, Icon, Row, Col } from 'antd'

const { Step } = Steps

const steps = [
  {
    title: 'นักวิ่ง',
    content: 'ข้อมูลส่วนตัว, ผู้ติดต่อ',
  },
  {
    title: 'ประเภท',
    content: 'และระยะทาง',
  },
  {
    title: 'เสื้อ',
    content: 'และการจัดส่ง',
  },
  {
    title: 'ชำระเงิน',
    content: 'และแจ้งชำระ',
  },
]

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }
  next() {
    const current = this.state.current + 1
    this.setState({ current })
  }
  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }
  goto(index) {
    const current = index
    this.setState({ current })
  }
  render() {
    const { current } = this.state
    const { stepContent } = this.props
    return (
      <div>
        <Steps current={current}>
          {steps.map((item, index) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.content}
              onClick={() => this.goto(index)}
            />
          ))}
        </Steps>
        <div className="steps-content">{stepContent[this.state.current].content}</div>
        <div className="steps-action">
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              {this.state.current > 0 && (
                <Button size="large" style={{ marginRight: 8 }} onClick={() => this.prev()}>
                  <Icon type="left" />ย้อนกลับ
                </Button>
              )}
              {this.state.current < steps.length - 1 && (
                <Button type="primary" size="large" onClick={() => this.next()}>
                  ต่อไป<Icon type="right" />
                </Button>
              )}
              {this.state.current === steps.length - 1 && (
                <Button
                  type="success"
                  size="large"
                  onClick={() => message.success('Processing complete!')}
                >
                  <Icon type="save" />
                  บันทึก
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
