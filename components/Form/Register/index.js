import React, { Component } from 'react'
import { Steps, Button, message, Icon, Row, Col, Progress, Layout } from 'antd'
import { connect } from 'react-redux'

const axios = require('axios')

const { Step } = Steps
const { Header, Footer, Sider, Content } = Layout

const steps = [
  {
    title: 'นักวิ่ง',
    content: 'ข้อมูลส่วนตัว, ผู้ติดต่อ',
  },
  {
    title: 'ประเภท, ระยะทาง',
    content: 'และขนาดเสื้อ',
  },
  {
    title: 'สรุปค่าใช้จ่าย',
    content: 'และวิธีการการจัดส่ง',
  },
  {
    title: 'ยืนยันการสมัคร',
    content: 'และแจ้งชำระเงิน',
  },
]

class RegisterForm extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      finish: false,
      percent: 0,
    }
  }
  next() {
    const current = this.state.current + 1
    const { data } = this.props.state
    const { info } = data

    if (current === 1) {
      if (typeof info !== 'undefined') {
        if (info.firstname && info.lastname && info.dob && info.age && info.gender && info.email && info.mobile && info.emer_person && info.emer_contact) {
          this.setState({ current })
          return
        }
      }
      message.warning('กรุณากรอกข้อมูลให้ครบถ้วน')
    } else if (current === 2) {
      if (typeof info !== 'undefined') {
        if (info.type && info.type !== 'นักเรียน') {
          if (info.distance && info.size) {
            this.setState({ current })
            return
          }
        } else if (info.distance) {
          this.setState({ current })
          return
        }
      }
      message.warning('กรุณาระบุประเภท ระยะทาง และขนาดเสื้อ')
    } else if (current === 3) {
      if (typeof info !== 'undefined') {
        if (info.shipmethod) {
          if (info.shipmethod === 'post') {
            const { address } = data
            if (typeof address !== 'undefined') {
              this.setState({ current })
              return
            } else {
              message.warning('กรุณาระบุที่อยู่สำหรับจัดส่งเสื้อ และเบอร์ BIB')
              return
            }
          } else {
            this.setState({ current })
            return
          }
        }
      }
      message.warning('กรุณาระบุวิธีจัดส่งเสื้อ และเบอร์ BIB')
    }
  }
  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }
  goto(index) {
    const current = index
    this.setState({ current })
  }

  handleSubmit() {
    const { data } = this.props.state
    const { info, payment } = data

    if (typeof info !== 'undefined') {
      const { agreement } = info
      const { url } = payment
      if (typeof url !== 'undefined' && typeof agreement !== 'undefined') {
        const registrantInfo = { data: [data] }
        this.register(registrantInfo)
        // console.log('post')
        // console.log(registrantInfo)
        // validate all data again
        // submit to api
        // redirect to thank page
      } else {
        message.warning('กรุณาแนบหลักฐานการชำระเงิน และยอมรับเงื่อนใข')
        return
      }
    }
  }

  register = async (bodyProperty) => {
    const res = await fetch(`${process.env.API_URL}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${btoa(process.env.USERNAME + ':' + process.env.PASSWORD)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bodyProperty,
      }),
      // credentials: 'same-origin',
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('API Server Error')
        }
        if (response.status === 204) {
          return {
            status: 'options',
          }
        }
        return response.json()
      })
      .then((data) => {
        if (data.status === 'success') {
          console.log('completed')
          this.setState({ finish: true })
          // steps = [
          //   {
          //     key: 'register',
          //     title: 'กรอกข้อมูล',
          //     completed: true,
          //     description: 'ชื่อ-สกุล, สถานศึกษา',
          //   },
          //   {
          //     key: 'finish',
          //     active: true,
          //     completed: true,
          //     title: 'สำเร็จ',
          //     description: 'ได้รับข้อมูลเรียบร้อยแล้ว',
          //   },
          // ]
          // this.setState({ finish: true, steps })
        } else if (data.status === 'fail') {
          this.setState({
            error: true,
            errorMsg: 'ผิดพลาด ไม่สามารถบันทึกข้อมูลสมัครได้',
          })
        }
      })

    this.setState({ loading: false })
  }
  renderFinished = () => {

    setInterval(() => {
      const percent = this.state.percent < 100 ? this.state.percent += 10 : this.state.percent
      this.setState({
        percent,
      })
    }, 200)

    return (
      <div>
        <Row type="flex" justify="center">
          <Row gutter={8}>

            <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }} >
              <Progress type="circle" percent={this.state.percent} /><br/>
              <p className="ant-upload-text" style={{ textAlign: 'center', fontSize: '22px', marginTop: '20px' }}>สมัครสำเร็จ</p>
              <p className="ant-upload-text" style={{ textAlign: 'center' }}>ใส่เนื้อหาเพิ่มเติมตรงนี้</p>
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
  render() {
    const { current, finish } = this.state
    const { stepContent } = this.props
    return (
      finish ?
        this.renderFinished() :
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
                    onClick={() => this.handleSubmit()}
                  >
                    <Icon type="save" />
                    ยืนยันการสมัครและชำระค่าบริการ
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

export default connect(mapStateToProps)(RegisterForm)
