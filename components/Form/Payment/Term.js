import React, { Component } from 'react'
import { Form, Input, InputNumber, Row, Col, Radio, Select, Button, Icon, Menu, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { inputChange } from '../../../actions'

require('moment/locale/th')

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
  },
}

const formItemTwiceLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
    lg: { span: 8 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
    lg: { span: 16 },
    xl: { span: 8 },
  },
}

const colLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
}

const colTwiceLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 11 },
  lg: { span: 11 },
  xl: { span: 11 },
}

const colTwiceTailLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 12 },
  xl: { span: 12 },
}

const colTrippleLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 7 },
  lg: { span: 7 },
  xl: { span: 7 },
}

const colTrippleTailLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 8 },
  lg: { span: 8 },
  xl: { span: 8 },
}


class Term extends Component {
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
        agreement: { value: true },
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
            agreement: { value: info.agreement || this.state.fields.agreement.value },
          },
        })
      }
    }
  }

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.checked)
  }

  render() {
    const { data } = this.props.state
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this

    console.log(props)

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <FormItem >
            {getFieldDecorator('agreement', {
              rules: [{ required: true, message: 'กรุณายอมรับเงื่อนใข' }],
              onChange: e => this.changeCheckButton(e, 'agreement'),
              initialValue: props.agreement.value,
            })(
              <Checkbox checked={props.agreement.value || this.state.agreement}>
              ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริง และได้ทำการฝึกซ้อม
              ทั้งมีสุขภาพสมบูรณ์พร้อมที่จะมีการแข่งขันในประเภทที่สมัครข้างต้นด้วยความเต็มใจ
              และจะปฏิบัติตามกติกาการแข่งขันทุกประการ
              และจะไม่เรียกร้องค่าเสียหายใดๆหากเกิดอันตรายหรือบาดเจ็บทั้งก่อนและหลังการแข่งขัน
              อีกทั้งยินดีที่จะแสดงหลักฐานพิสูจน์ตัวเองต่อคณะผู้จัดการแข่งขัน
              และข้าพเจ้ายินยอมให้คณะผู้จัดการแข่งขันถ่ายภาพหรือภาพยนต์เพื่อบันทึกการแข่งขัน
              และถือว่าการบันทึกภาพยนต์ดังกล่าวเป็นลิขสิทธิ์ของคณะกรรมการจัดการแข่งขันในครั้งนี้
              การยืนยันการสมัครผ่านระบบออนไลน์นี้
              ถือว่าท่านได้ให้การยอมรับข้อความข้างต้นแทนการเซ็นชื่อ
              </Checkbox>
            )}
          </FormItem>
          <p>
            * หลังจากยืนยันและชำระค่าสมัครแล้ว
            ไม่สามารถยกเลิกหรือเปลี่ยนแปลงข้อมูลการสมัครใดๆในทุกกรณี*
          </p>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  state,
})

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  }})(connect(mapStateToProps, mapDispatchToProps)(Term))

