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


class Info extends Component {

  constructor(props) {
    super(props)
    this.inputChangeFunc = this.inputChangeFunc.bind(this)
  }

  state = {
    date: '',
    month: '',
    year: '',
    age: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  inputChangeFunc = (e) => {
    // this.handleSubmit(e)
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
    this.setState({ ...this.state, date: value }, () => this.calcAge())
    const { inputChange } = this.props
    inputChange('info', 'date', value)
  }

  changeMonth = (value) => {
    this.setState({ ...this.state, month: value }, () => this.calcAge())
    const { inputChange } = this.props
    inputChange('info', 'month', value)
  }

  changeYear = (value) => {
    this.setState({ ...this.state, year: value }, () => this.calcAge())
    const { inputChange } = this.props
    inputChange('info', 'year', value)
  }

  calcAge = () => {
    // const { date, month, year } = this.state
    const date = this.props.date.value
    const month = this.props.month.value
    const year = this.props.year.value
    if (date && month && year) {
      const age = moment().diff(`${year}-${month}-${date}`, 'years')
      this.setState({ ...this.state, age }, () => {
        this.props.inputChange('info', 'age', age)
        this.props.inputChange('info', 'dob', `${year}-${month}-${date}`)
      })
    }
  }

  validateNationalID = (value) => {

    if (value.length !== 13) {
      return false
    }

    const reducer = (accumulator, currentValue, currentIndex) =>
      (currentIndex < (value.length - 1) ?
        accumulator + (parseFloat(currentValue) * (13 - currentIndex)) : accumulator)

    const sum = Array.from(value).reduce(reducer, 0)

    return (((11 - sum) % 11) % 10 !== parseFloat(value.charAt(12)))
  }

  inputChangeCitizen = (e) => {

    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
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

  handleChangeStep = () => {
    // console.log(this.props)
    // this.props.form.validateFields(['firstname'], { force: true })
    // this.props.form.validateFields(['emer_contact'], { force: true })
    // this.props.changeStep()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this

    const dateOptions = [...Array(31).keys()].map(date => <Option key={date+1} value={String(date+1).padStart(2, "0")}>{date+1}</Option>)
    const monthOptions = moment.months().map((month, index) => <Option key={month} value={String(index+1).padStart(2, "0")}>{month}</Option>)
    const yearOptions = [...Array(95).keys()].map(date => <Option key={2018-(date+5)} value={2018-(date+5)}>{2018-(date+5)+543}</Option>)

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout}>
                <Col {...colTwiceTailLayout} style={{ marginBottom: '16px' }}>
                  <FormItem {...formItemLayout} label="ชื่อ">
                    {getFieldDecorator('firstname', {
                      rules: [{ required: true, message: 'กรุณาระบุชื่อ' }],
                      onChange: this.inputChangeFunc,
                      initialValue: props.firstname.value,
                    })(<Input title="info" placeholder="ชื่อ" maxLength="255" />)}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      &nbsp;
                  </span>
                </Col>
                <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
                  <FormItem {...formItemLayout} label="นามสกุล">
                    {getFieldDecorator('lastname', {
                      rules: [{ required: true, message: 'กรุณาระบุนามสกุล' }],
                      onChange: this.inputChangeFunc,
                      initialValue: props.lastname.value,
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุนามสกุล',
                      //   }],
                      // }],
                    })(<Input title="info" placeholder="นามสกุล" maxLength="255" />)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="หมายเลขบัตรประชาชนสำหรับใช้อ้างอิงการสมัคร">
                {getFieldDecorator('citizen', {
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      len: 13,
                      message: 'กรุณาระบุหมายเลขบัตรประชาชนสำหรับใช้อ้างอิงการสมัคร'
                    },
                    {
                      validator: this.validateNationalID,
                    },
                  ],
                  onChange: this.inputChangeCitizen,
                  initialValue: props.citizen.value,
                })(<Input title="info" placeholder="หมายเลขบัตรประชาชนสำหรับใช้อ้างอิงการสมัคร" maxLength="13" />)}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} >
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout}>
                <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
                  <FormItem {...formItemLayout} label="วันเกิด">
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: 'กรุณาระบุวันเกิด' }],
                      onChange: this.changeDate,
                      initialValue: props.date.value,
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุวันเกิด',
                      //   }],
                      // }],
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
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุเดือนเกิด',
                      //   }],
                      // }],
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
                  <FormItem {...formItemLayout} label="ปีเกิด (พ.ศ.)">
                    {getFieldDecorator('year', {
                      rules: [{ required: true, message: 'กรุณาระบุปีเกิด' }],
                      onChange: this.changeYear,
                      initialValue: props.year.value,
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุปีเกิด',
                      //   }],
                      // }],
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
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout}>
                <Col {...colTwiceTailLayout} style={{ marginBottom: '16px' }}>
                  <FormItem label="อายุ" help="(คำนวนให้จากปีเกิด)">
                    {getFieldDecorator('age', {
                      rules: [{ required: true, message: 'กรุณาระบุวันเดือนปีเกิดเพื่อคำนวนอายุ' }],
                      initialValue: this.state.age || props.age.value,
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุวันเดือนปีเกิดเพื่อคำนวนอายุ',
                      //   }],
                      // }],
                    })(<InputNumber min={5} max={100} readOnly disabled />)}
                  </FormItem>
                </Col>
                <Col span={1}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      &nbsp;
                  </span>
                </Col>
                <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
                  <FormItem label="เพศ">
                    {getFieldDecorator('gender', {
                      rules: [{ required: true, message: 'กรุณาระบุเพศ' }],
                      onChange: e => this.changeCheckButton(e, 'gender'),
                      initialValue: props.gender.value,
                      // validate: [{
                      //   // trigger: ['onBlur'],
                      //   rules: [{
                      //     required: true,
                      //     message: 'กรุณาระบุเพศ',
                      //   }],
                      // }],
                    })(
                      <RadioGroup style={{ float: 'left' }}>
                        <RadioButton value="male">ชาย</RadioButton>
                        <RadioButton value="female">หญิง</RadioButton>
                      </RadioGroup>)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="อีเมล">
                {getFieldDecorator('email', {
                  // rules: [{ required: true, message: 'กรุณาระบุอีเมล' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.email.value,
                  validate: [{
                    trigger: 'onBlur',
                    rules: [{
                      required: true,
                      message: 'กรุณาระบุอีเมล'
                    }],
                  }, {
                    trigger: ['onBlur', 'onChange'],
                    rules: [{
                      type: 'email',
                      message: 'กรุณาระบุอีเมลที่ถูกต้อง',
                    }],
                  }],
                })(<Input title="info" placeholder="อีเมล" maxLength="255" />)}
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
                  rules: [{
                    required: true,
                    type: 'string',
                    pattern: /^\(?(\d{2,3})\)?[-. ]?(\d{3,4})[-. ]?([0-9]{4})$/,
                    len: 10,
                    message: 'กรุณาระบุเบอร์มือถือ',
                  }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.mobile.value,
                  // validate: [{
                  //   trigger: ['onBlur', 'onChange'],
                  //   rules: [{
                  //     required: true,
                  //     type: 'string',
                  //     pattern: /^\(?(\d{2,3})\)?[-. ]?(\d{3,4})[-. ]?([0-9]{4})$/,
                  //     len: 10,
                  //     message: 'กรุณาระบุเบอร์มือถือ',
                  //   }],
                  // }],
                })(<Input title="info" placeholder="เบอร์มือถือ" maxLength="10" />)}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout}>
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout} label="ชื่อผู้ติดต่อกรณีฉุกเฉิน">
                {getFieldDecorator('emer_person', {
                  rules: [{ required: true, message: 'กรุณาระบุชื่อผู้ติดต่อกรณีฉุกเฉิน' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.emer_person.value,
                  // validate: [{
                  //   // trigger: ['onBlur'],
                  //   rules: [{
                  //     required: true,
                  //     message: 'กรุณาระบุชื่อผู้ติดต่อกรณีฉุกเฉิน',
                  //   }],
                  // }],
                })(<Input title="info" placeholder="ชื่อผู้ติดต่อกรณีฉุกเฉิน" maxLength="255" />)}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                &nbsp;
              </span>
            </Col>
            <Col {...colTwiceLayout}>
              <FormItem {...formItemLayout} label="เบอร์มือถือของผู้ติดต่อกรณีฉุกเฉิน">
                {getFieldDecorator('emer_contact', {
                  rules: [{ required: true, type: 'string',
                  pattern: /^\(?(\d{2,3})\)?[-. ]?(\d{3,4})[-. ]?([0-9]{4})$/,
                  len: 10, message: 'กรุณาระบุเบอร์มือถือของผู้ติดต่อกรณีฉุกเฉิน' }],
                  onChange: this.inputChangeFunc,
                  initialValue: props.emer_contact.value,
                })(<Input title="info" placeholder="เบอร์มือถือของผู้ติดต่อกรณีฉุกเฉิน" maxLength="10" />)}
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
