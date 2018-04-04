import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { runnerType, shirtSize } from '../../../config/'
import { inputChange } from '../../../actions'

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


class RunnerClass extends Component {

  constructor(props) {
    super(props)
    this.inputChangeFunc = this.inputChangeFunc.bind(this)
  }

  state = {
    runnerType,
    runnerGen: [
      { min: 4, max: 12, title: 'อายุไม่เกิน 12 ปี' },
      { min: 13, max: 14, title: 'อายุ 13 - 14 ปี' },
      { min: 15, max: 16, title: 'อายุ 15 - 16 ปี' },
      { min: 17, max: 18, title: 'อายุ 17 - 18 ปี' },
      { min: 19, max: 29, title: 'อายุไม่เกิน 29 ปี' },
      { min: 30, max: 39, title: 'อายุ 30 - 39 ปี' },
      { min: 40, max: 49, title: 'อายุ 40 - 49 ปี' },
      { min: 59, max: 59, title: 'อายุ 50 - 59 ปี' },
      { min: 60, max: 99, title: 'อายุ 60 ปีขึ้นไป' },
    ],
    type: '',
    distance: '',
    size: '',
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

  renderRunnerType() {
    return this.state.runnerType.filter(type => type.age.min <= this.props.age && type.age.max >= this.props.age ).map(type => (
      <Tooltip key={type.name} title={`ค่าสมัคร ${type.fee} บาท`}><RadioButton value={type.name}><strong>{type.name}</strong> ({type.fee} บาท)</RadioButton></Tooltip>
    ))
  }

  renderRunnerDistance() {
    const distanceByRunnerType = this.state.runnerType.filter(type => type.name === this.props.type.value)

    return distanceByRunnerType[0].distance.map(distance => (
      <Tooltip key={distance} title={`ระยะทาง ${distance} กิโลเมตร`}><RadioButton value={distance}>{distance} กิโลเมตร</RadioButton></Tooltip>
    ))
  }

  renderRunnerGen() {
    const runnerGeneration = this.state.runnerGen.filter(gen => gen.min <= this.props.age && gen.max >= this.props.age)
    return `จัดอยู่ในรุ่น${runnerGeneration[0].title}`
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <FormItem label="ประเภท">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'กรุณาระบุประเภท' }],
              onChange: e => this.changeCheckButton(e, 'type'),
              initialValue: props.type.value,
            })(
              <RadioGroup style={{ float: 'left' }}>
                {this.renderRunnerType()}
              </RadioGroup>)}
          </FormItem>
          {this.props.type.value ?
            <FormItem label="ระยะทาง">
              {getFieldDecorator('distance', {
                rules: [{ required: true, message: 'กรุณาระบุระยะทาง' }],
                onChange: e => this.changeCheckButton(e, 'distance'),
                initialValue: props.distance.value,
              })(
                <RadioGroup style={{ float: 'left' }}>
                  {this.renderRunnerDistance()}
                </RadioGroup>)}
            </FormItem> : null
          }
          <FormItem {...formItemLayout}>
          <strong className="ant-form-item-required">({this.renderRunnerGen()})</strong>
          </FormItem>
          <FormItem {...formItemLayout} label="ชื่อทีม (ถ้ามี)">
            {getFieldDecorator('team', {
              rules: [{ required: false, message: 'กรุณาระบุชื่อทีม (ถ้ามี)' }],
              onChange: this.inputChangeFunc,
              initialValue: props.team.value,
            })(<Input title="info" placeholder="ชื่อทีม" maxLength="255" />)}
          </FormItem>
        </Col>
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
  }})(connect(null, mapDispatchToProps)(RunnerClass))
