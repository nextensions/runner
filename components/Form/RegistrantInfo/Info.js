import React, { Component } from 'react'
import { Form, Input, InputNumber, Row, Col, Radio, Select, Button, Icon, Menu } from 'antd'
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


class Info extends Component {
  constructor(props) {
    super(props)
    this.inputChangeFunc = this.inputChangeFunc.bind(this)
     // props.form.setFieldsValue({ weight: 50 })
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

  changeDate = (value) => {
    const { inputChange } = this.props
    inputChange('info', 'date', value)
  }

  changeMonth = (value) => {
    const { inputChange } = this.props
    inputChange('info', 'month', value)
  }

  changeYear = (value) => {
    const { inputChange } = this.props
    inputChange('info', 'year', value)
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  handleBlur = () => {
    console.log('blur')
  }

  handleFocus = () => {
    console.log('focus')
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this.props


    const dateOptions = [...Array(31).keys()].map(date => <Option key={date+1} value={date+1}>{date+1}</Option>)
    const monthOptions = moment.months().map(month => <Option key={month} value={month}>{month}</Option>)
    const yearOptions = [...Array(95).keys()].map(date => <Option key={date+1918} value={date+1918}>{date+1918+543}</Option>)


    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout} label="ชื่อ">
                {getFieldDecorator('firstname', {
                  rules: [{ required: true, message: 'กรุณาระบุชื่อ' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.firstname.value,
                  // props: { defaultValue: props.firstname.value },
                })(<Input title="info" placeholder="ชื่อ" />)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="นามสกุล">
                {getFieldDecorator('lastname', {
                  rules: [{ required: true, message: 'กรุณาระบุนามสกุล'}],
                  onChange: this.inputChangeFunc,
                  initialValue: props.lastname.value,
                })(<Input title="info" placeholder="นามสกุล" />)}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} >
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem label="เพศ">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'กรุณาระบุเพศ' }],
                  onChange: e => this.changeCheckButton(e, 'gender'),
                  initialValue: props.gender.value,
                })(
                  <RadioGroup style={{ float: 'left' }}>
                    <RadioButton value="male">ชาย</RadioButton>
                    <RadioButton value="female">หญิง</RadioButton>
                  </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout}>
                <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
                  <FormItem {...formItemLayout} label="วันเกิด">
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: 'กรุณาระบุวันเกิด' }],
                      onChange: this.changeDate,
                      initialValue: props.date.value,
                    })(<Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                      >
                        {dateOptions}
                      </Select>)}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      &nbsp;
                  </span>
                </Col>
                <Col {...colTrippleLayout}>
                  <FormItem {...formItemLayout} label="เดือนเกิด">
                    {getFieldDecorator('month', {
                      rules: [{ required: true, message: 'กรุณาระบุเดือนเกิด' }],
                      onChange: this.changeMonth,
                      initialValue: props.month.value,
                    })(<Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {monthOptions}
                      </Select>)}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      &nbsp;
                  </span>
                </Col>
                <Col {...colTrippleTailLayout}>
                  <FormItem {...formItemLayout} label="ปีเกิด">
                    {getFieldDecorator('year', {
                      rules: [{ required: true, message: 'กรุณาระบุปีเกิด' }],
                      onChange: this.changeYear,
                      initialValue: props.year.value,
                    })(<Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                      >
                        {yearOptions}
                      </Select>)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="อีเมล">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'กรุณาระบุอีเมล' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.email.value,
                })(<Input title="info" placeholder="อีเมล" />)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout} label="เบอร์มือถือ">
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: 'กรุณาระบุเบอร์มือถือ' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.mobile.value,
                })(<Input title="info" placeholder="เบอร์มือถือ" />)}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem label="น้ำหนัก">
                {getFieldDecorator('weight', {
                  rules: [{ required: true, message: 'กรุณาระบุน้ำหนัก' }],
                  initialValue: props.weight.value,
                })(<InputNumber title="info" min={30} max={200} onChange={this.changeWeight} />)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="ส่วนสูง">
                {getFieldDecorator('height', {
                  rules: [{ required: true, message: 'กรุณาระบุส่วนสูง' }],
                  initialValue: props.height.value,
                })(<InputNumber title="info" min={100} max={200} onChange={this.changeHeight} />)}
              </FormItem>
            </Col>
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
  }})(connect(null, mapDispatchToProps)(Info))
