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

class Summary extends Component {
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
    const shippingFee = data.info.shipmethod !== 'pickup' ? 65 : 0
    let districtLabel = ''
    let subDistrictLabel = ''

    if (data.info.shipmethod === 'post') {
      districtLabel = data.address.province === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ'
      subDistrictLabel = data.address.province === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล'
    }


    const gender = [
      { en: 'male', th: 'ชาย' },
      { en: 'female', th: 'หญิง' },
    ]

    return (
      <Row type="flex" justify="end">
        <Col {...colLayout}>
          <Collapse defaultActiveKey={['1', '2', '3']} onChange={this.callback}>
            <Panel header="ข้อมูลส่วนตัว" key="1">
              <Row type="flex" justify="end">
                <Col span={24}>
                  <strong>ชื่อ-นามสกุล: </strong>{`${data.info.firstname} ${data.info.firstname}`} <strong>เพศ: </strong>{gender.filter(sex => sex.en === data.info.gender)[0].th} <strong>อายุ: </strong>{`${data.info.age} ปี`}<br />
                  <strong>อีเมล: </strong>{data.info.email} <strong>มือถือ: </strong> {data.info.mobile}<br />
                  <strong>กรณีฉุกเฉินติดต่อ: </strong>{`${data.info.emer_person} (${data.info.emer_contact})`}<br />
                </Col>
              </Row>
            </Panel>
            <Panel header="ประเภท, ระยะทาง และขนาดเสื้อ" key="2">
              <Row type="flex" justify="end">
                <Col span={24}>
                  <strong>ประเภท: </strong>{data.info.type} <strong>ระยะทาง: </strong>{data.info.distance} กิโลเมตร<br />
                  {
                    data.info.type !== 'นักเรียน' ?
                      <div><strong>เสื้อไซต์: </strong> {runningShirtInfo.size} (1 ตัว)</div> : null
                  }
                </Col>
              </Row>
            </Panel>
            <Panel header="วิธีจัดส่งเสื้อ และเบอร์ BIB" key="3">
              <Row type="flex" justify="end">
                <Col span={24}>
                  {
                    data.info.shipmethod === 'post' ?
                      <strong>
                        ส่งไปรษณีย์<br />
                        {data.info.firstname} {data.info.lastname} ({data.info.mobile})<br />
                        {data.address.address} {data.address.moo ? `หมู่ ${data.address.moo}` : null} {data.address.soi ? `ซอย ${data.address.soi}` : null} {data.address.street ? `ถนน ${data.address.street}` : null}<br />
                        {subDistrictLabel} {data.address.subDistrict} {districtLabel}   {data.address.district} {data.address.province} {data.address.zipcode}
                      </strong> :
                      <strong>
                        มารับด้วยตนเอง<br />
                        ณ โรงเรียนสิริรัตนาธร<br />
                        วันศุกร์ที่ 1 มิถุนายน 2561 ตั้งแต่เวลา 12.00 – 19.00 น.<br />
                        และวันเสาร์ที่ 2 มิถุนายน 2561 ตั้งแต่เวลา 04.00 – 05.00 น.
                      </strong>
                  }
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

export default connect(mapStateToProps)(Summary)
