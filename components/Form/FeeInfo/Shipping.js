import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderAddress'

require('moment/locale/th')

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

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

const radioStyle = {
  display: 'block',
  // height: '30px',
  lineHeight: '30px',
}


class Shipping extends Component {

  constructor(props) {
    super(props)
    this.inputChangeFunc = this.inputChangeFunc.bind(this)
  }

  state = {
    shipmethod: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  handleChangeAddress = (address) => {
    const {
      a: subDistrict,
      d: district,
      p: province,
      z: zipcode,
    } = address
    const { inputChange } = this.props
    inputChange('address', 'subDistrict', subDistrict)
    inputChange('address', 'district', district)
    inputChange('address', 'province', province)
    inputChange('address', 'zipcode', zipcode)

    this.setState({
      ...this.state,
      subDistrict,
      district,
      province,
      zipcode,
    })
  }

  inputChangeFunc = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }
  changeWeight = (value) => {
    const { inputChange } = this.props
    inputChange('info', 'weight', value)
  }

  changeHeight = (value) => {
    const { inputChange } = this.props
    inputChange('info', 'height', value)
  }

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { props, state } = this

    const defaultAddress = {
      a: props.subDistrict.value,
      d: props.district.value,
      p: props.province.value,
      z: props.zipcode.value,
    }

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <FormItem label="วิธีจัดส่ง">
            {getFieldDecorator('shipmethod', {
              rules: [{ required: true, message: 'กรุณาระบุวิธีจัดส่ง' }],
              onChange: e => this.changeCheckButton(e, 'shipmethod'),
              initialValue: props.shipmethod.value,
            })(
              <RadioGroup style={{ float: 'left' }}>
                <Radio style={radioStyle} value="post">
                  <strong>ไปรษณีย์</strong><br />
                  <em style={{ marginLeft: '20px' }}>
                    คนแรก 65 บาท คนที่ 2 เป็นต้นไปคนละ 35 บาท
                  </em>
                </Radio>
                <Radio style={radioStyle} value="pickup">
                  <strong>มารับด้วยตนเอง ณ โรงเรียนสิริรัตนาธร</strong><br />
                  <em style={{ marginLeft: '20px' }}>
                    วันศุกร์ที่ 1 มิถุนายน 2561 ตั้งแต่เวลา 12.00 – 19.00 น.
                  </em><br />
                  <em style={{ marginLeft: '20px' }}>
                    และวันเสาร์ที่ 2 มิถุนายน 2561 ตั้งแต่เวลา 04.00 – 05.00 น.
                  </em>
                </Radio>
              </RadioGroup>)}
          </FormItem>
        </Col>
        { this.props.shipmethod.value === 'post' ?
          <Col {...colLayout}>
            <Divider>ระบุที่อยู่สำหรับจัดส่งเสื้อ และเบอร์ BIB</Divider>
            <FormItem {...formItemLayout} label="บ้านเลขที่ หมู่บ้าน คอนโด">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'กรุณาระบุ บ้านเลขที่ หมู่บ้าน คอนโด' }],
                onChange: this.inputChange,
                // props: { defaultValue: this.props.address.value },
                initialValue: props.address.value,
              })(<Input title="address" placeholder="บ้านเลขที่ หมู่บ้าน คอนโด" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
                <FormItem {...formItemLayout} label="หมู่">
                  {getFieldDecorator('moo', {
                    rules: [{ required: false, message: 'กรุณาระบุ ' }],
                    onChange: this.inputChange,
                    // props: { defaultValue: this.props.moo.value },
                    initialValue: props.moo.value,
                  })(<Input title="address" placeholder="หมู่" />)}
                </FormItem>
              </Col>
              <Col span={1}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    &nbsp;
                </span>
              </Col>
              <Col {...colTrippleLayout}>
                <FormItem {...formItemLayout} label="ซอย">
                  {getFieldDecorator('soi', {
                    rules: [{ required: false, message: 'กรุณาระบุ ซอย' }],
                    onChange: this.inputChange,
                    // props: { defaultValue: props.soi.value },
                    initialValue: props.soi.value,
                  })(<Input title="address" placeholder="ซอย" />)}
                </FormItem>
              </Col>
              <Col span={1}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    &nbsp;
                </span>
              </Col>
              <Col {...colTrippleTailLayout}>
                <FormItem {...formItemLayout} label="ถนน">
                  {getFieldDecorator('street', {
                    rules: [{ required: false, message: 'กรุณาระบุ ' }],
                    onChange: this.inputChange,
                    // props: { defaultValue: props.street.value },
                    initialValue: props.street.value,
                  })(<Input title="address" placeholder="ถนน" />)}
                </FormItem>
              </Col>
            </FormItem>

            <Typeahead
              kind="address"
              fieldsEnum={fieldsEnum}
              resolveResultbyField={resolveResultbyField}
              renderResult={(data) => {
                const provinceLabel = data.p === 'กรุงเทพมหานคร' ? '' : 'จังหวัด'
                const districtLabel = data.p === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ'
                const subDistrictLabel = data.p === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล'
                return (
                  <div>
                    {subDistrictLabel}
                    <b>{data.d}</b> {districtLabel}
                    <b>{data.a}</b> {provinceLabel}
                    <b>{data.p}</b> รหัสไปรษณีย์
                    <b>{data.z}</b>
                  </div>
                )
              }}
              onAddressSelected={addressObject => this.handleChangeAddress(addressObject)}
              defaultAddress={defaultAddress}
            />


          </Col> : null
        }
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  }})(connect(null, mapDispatchToProps)(Shipping))
