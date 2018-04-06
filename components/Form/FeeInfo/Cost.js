import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Radio, Divider, Tooltip, Modal, Collapse } from 'antd'
import { connect } from 'react-redux'

import { runnerType, shirtSize } from '../../../config/'

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
    const { members, payment } = data
    const runningFee = runnerType.filter(type => type.name === data.info.type)[0]

    const runningShirtInfo = data.info.type !== 'นักเรียน' ? shirtSize.filter(shirt => shirt.size === data.info.size)[0] : ''

    const shippingFee = data.info.shipmethod !== 'pickup' ? 65 : 0


    const membersShippingFee = members !== undefined ? members.reduce((fee, member) => {
      const memberShipFee = (data.info.shipmethod !== 'pickup' && member.type !== 'นักเรียน') ? 30 : 0
      return fee + memberShipFee
    }, 0) : 0

    const membersRunningFee = members !== undefined ? members.reduce((fee, member) => {
      return fee + parseInt(runnerType.filter(type => type.name === member.type)[0].fee, 10)
    }, 0) : 0

    const totalRunningFee = runningFee.fee + membersRunningFee
    const totalShippingFee = shippingFee + membersShippingFee

    const membersFeeContent = members !== undefined ? members.map((member, index) => {
      return (
        <Row key={index} type="flex" justify="end">
          <Col span={12}>
            ประเภท <strong style={{ textDecoration: 'underline' }}>{member.type}</strong>{' '}
            ระยะทาง{' '}
            <strong style={{ textDecoration: 'underline' }}>
              {member.distance} กิโลเมตร
            </strong>
          </Col>
          <Col span={12} align="right">
            <strong>
              {runnerType.filter(type => type.name === member.type)[0].fee.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} บาท
            </strong>
          </Col>
        </Row>
      )
    }) : null

    const membersShippingFeeContent = members !== undefined ? members.map((member, index) => {
      if (member.type === 'นักเรียน') {
        return null
      }

      const memberShirtInfo = member.type !== 'นักเรียน' ? shirtSize.filter(shirt => shirt.size === member.size)[0] : ''
      const nextMemberShippingFee = 30
      return (
        <Row key={index} type="flex" justify="end">
          <Col span={12}>
            <strong style={{ textDecoration: 'underline' }}>
              ไซต์ {memberShirtInfo.size}
            </strong>{' '}
            (รอบอก {memberShirtInfo.chest} นิ้ว){' '}
            <strong style={{ textDecoration: 'underline' }}>1 ตัว</strong>
          </Col>
          <Col span={12} align="right">
            <strong>{nextMemberShippingFee.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} บาท</strong>
          </Col>
        </Row>
      )
    }) : null

    return (
      <Row type="flex" justify="end">
        <Col {...colLayout}>
          <Collapse defaultActiveKey={['1', '2', '3']} onChange={this.callback}>
            <Panel header="ค่าสมัครวิ่ง" key="1">
              <Row type="flex" justify="end">
                <Col span={12}>
                  ประเภท <strong style={{ textDecoration: 'underline' }}>{data.info.type}</strong>{' '}
                  ระยะทาง{' '}
                  <strong style={{ textDecoration: 'underline' }}>
                    {data.info.distance} กิโลเมตร
                  </strong>
                </Col>
                <Col span={12} align="right">
                  <strong>
                    {runningFee.fee.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} บาท
                  </strong>
                </Col>
              </Row>
              {membersFeeContent}
            </Panel>
            {
              data.info.type !== 'นักเรียน' && data.info.shipmethod !== 'pickup' ?
                <Panel header="ค่าจัดส่งเสื้อ และเบอร์ BIB" key="2">
                  <Row type="flex" justify="end">
                    <Col span={12}>
                      <strong style={{ textDecoration: 'underline' }}>
                        ไซต์ {runningShirtInfo.size}
                      </strong>{' '}
                      (รอบอก {runningShirtInfo.chest} นิ้ว){' '}
                      <strong style={{ textDecoration: 'underline' }}>1 ตัว</strong>
                    </Col>
                    <Col span={12} align="right">
                      <strong>{shippingFee.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} บาท</strong>
                    </Col>
                  </Row>
                  {membersShippingFeeContent}
                </Panel> : null
            }
            <Panel header="รวมทั้งสิ้น" key="3">
              <Row type="flex" justify="end">
                <Col span={12} align="right">
                  <strong style={{ fontSize: 22 }}>{(totalRunningFee + totalShippingFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} บาท</strong>
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
