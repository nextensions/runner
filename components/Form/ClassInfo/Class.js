import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip, Select, Modal, Button, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { runnerType, shirtSize } from '../../../config/'
import { inputChange, inputChangeMember } from '../../../actions'

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
      { min: 19, max: 19, title: 'อายุไม่เกิน 19 ปี' },
      { min: 20, max: 29, title: 'อายุ 20 - 29 ปี' },
      { min: 30, max: 39, title: 'อายุ 30 - 39 ปี' },
      { min: 40, max: 49, title: 'อายุ 40 - 49 ปี' },
      { min: 59, max: 59, title: 'อายุ 50 - 59 ปี' },
      { min: 60, max: 99, title: 'อายุ 60 ปีขึ้นไป' },
    ],
    type: '',
    distance: '',
    size: '',
    loading: false,
    visible: false,
    members: {},
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({ loading: true })
    console.log(this.state)
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  validateNationalID = (value) => {

    if (value.length !== 13) {
      return false
    }

    const reducer = (accumulator, currentValue, currentIndex) =>
      (currentIndex < (value.length - 1) ?
        accumulator + (parseFloat(currentValue) * (13 - currentIndex)) : accumulator)

    const sum = Array.from(value).reduce(reducer, 0)
    return ((11 - (sum % 11)) % 10 === parseFloat(value.charAt(12)))
  }

  inputChangeFunc = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  changeMembers = (value) => {
    this.setState({ ...this.state, member: value })
    const { inputChange } = this.props
    inputChange('info', 'member', value)
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

    const student10K = 'อายุไม่เกิน 19 ปี'
    let division = runnerGeneration[0].title

    if (this.props.distance.value === 10 && this.props.type.value === 'นักเรียน รับเสื้อ') {
      division = student10K
    }

    return `จัดอยู่ในรุ่น${division}`
  }

  renderAdditionalMember() {
    const memberNo = 'member_0_'
    const { getFieldDecorator } = this.props.form

    const colForthLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 5 },
      lg: { span: 5 },
      xl: { span: 5 },
    }

    const colForthTailLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 6 },
      lg: { span: 6 },
      xl: { span: 6 },
    }

    const inputChangeFunc = (e) => {
      const { inputChange } = this.props
      const { id, title, value } = e.target

      this.setState({
        members: {
          ...this.state.members,
          [id]: value,
        },
      })

      // console.log(this.state)
    }

    const changeCheckButton = (e, name) => {
      const { inputChange } = this.props
      inputChange(memberNo, name, e.target.value)
    }

    const changeDate = (value) => {
      this.setState({
        members: {
          ...this.state.members,
          date: value,
        },
      }, () => calcAge())
    }

    const changeMonth = (value) => {
      this.setState({
        members: {
          ...this.state.members,
          month: value,
        },
      }, () => calcAge())
    }

    const changeYear = (value) => {
      this.setState({
        members: {
          ...this.state.members,
          year: value,
        },
      }, () => calcAge())
    }

    const calcAge = () => {
      const { date, month, year } = this.state.members
      if (date && month && year) {
        const age = moment().diff(`${year}-${month}-${date}`, 'years')
        this.setState({
          members: {
            ...this.state.members,
            age,
            dob: `${year}-${month}-${date}`,
          },
        })
      }
    }

    const dateOptions = [...Array(31).keys()].map(date => <Option key={date+1} value={String(date+1).padStart(2, "0")}>{date+1}</Option>)
    const monthOptions = moment.months().map((month, index) => <Option key={month} value={String(index+1).padStart(2, "0")}>{month}</Option>)
    const yearOptions = [...Array(95).keys()].map(date => <Option key={2018-(date+5)} value={2018-(date+5)}>{2018-(date+5)+543}</Option>)


    const {
      firstname, lastname, citizen, date, month, year, dob, age, gender,
    } = this.state.members

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
                      onChange: inputChangeFunc,
                      initialValue: firstname,
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
                      onChange: inputChangeFunc,
                      initialValue: lastname,
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
              <FormItem {...formItemLayout} label="หมายเลขบัตรประชาชน">
                {getFieldDecorator('citizen', {
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      len: 13,
                      message: 'กรุณาระบุหมายเลขบัตรประชาชน',
                    },
                    {
                      message: 'กรุณาระบุหมายเลขบัตรประชาชนที่ถูกต้อง',
                      validator: (rule, value, callback) => this.validateNationalID(value) ? callback() : callback(true),
                    },
                  ],
                  onChange: inputChangeFunc,
                  initialValue: citizen,
                })(<Input title="info" placeholder="หมายเลขบัตรประชาชน" maxLength="13" />)}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} >
            <Col {...colTwiceLayout} style={{ marginBottom: '16px', marginTop: '15px' }}>
              <FormItem {...formItemLayout}>
                <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
                  <FormItem {...formItemLayout} label="วันเกิด">
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: 'กรุณาระบุวันเกิด' }],
                      onChange: changeDate,
                      initialValue: date,
                    })(<Select
                      showSearch
                      placeholder="ระบุวันเกิด"
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
                      onChange: changeMonth,
                      initialValue: month,
                    })(<Select
                      showSearch
                      placeholder="ระบุเดือนเกิด"
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
                      onChange: changeYear,
                      initialValue: year,
                    })(<Select
                      showSearch
                      placeholder="ระบุปีเกิด"
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
                      initialValue: age,
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
                      onChange: e => changeCheckButton(e, 'gender'),
                      initialValue: gender,
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
          <FormItem {...formItemLayout} >
            <Col {...colTwiceLayout} style={{ marginBottom: '16px' }}>
              {this.renderSelectRunnerType('')}
            </Col>
          </FormItem>
        </Col>
      </Row>
    )
  }

  renderMoreMembers() {
    const { visible, loading } = this.state

    return (
      <Modal
        visible={visible}
        style={{ width: '100%' }}
        title="สมัครนักวิ่งเพิ่ม"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        wrapClassName="vertical-center-modal"
        footer={[
          <Button key="back" onClick={this.handleCancel}>ยกเลิก</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            เพิ่ม
          </Button>,
        ]}
      >
        {this.renderAdditionalMember()}
      </Modal>
    )
  }

  renderSelectRunnerType(type) {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <FormItem label="ประเภท">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'กรุณาระบุประเภท' }],
            onChange: e => this.changeCheckButton(e, 'type'),
            initialValue: type,
          })(
            <RadioGroup style={{ float: 'left' }}>
              {this.renderRunnerType()}
            </RadioGroup>)}
        </FormItem>
        {type ?
          <FormItem label="ระยะทาง">
            {getFieldDecorator('distance', {
              rules: [{ required: true, message: 'กรุณาระบุระยะทาง' }],
              onChange: e => this.changeCheckButton(e, 'distance'),
              initialValue: this.props.distance.value,
            })(
              <RadioGroup style={{ float: 'left' }}>
                {this.renderRunnerDistance()}
              </RadioGroup>)}
          </FormItem> : null
        }
      </div>
    )
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this


    const memberOptions = [...Array(9).keys()].map(member => <Option key={member+2} value={member+2}>สมัครเพิ่มอีก {member+1} คน</Option>)

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          {this.renderSelectRunnerType(props.type.value)}

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

          <Button type="primary" onClick={this.showModal}>
            สมัครนักวิ่งเพิ่ม (คนที่ 2-10)
          </Button>
          {this.renderMoreMembers()}
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
  inputChangeMember: bindActionCreators(inputChangeMember, dispatch),
})

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  }})(connect(null, mapDispatchToProps)(RunnerClass))
