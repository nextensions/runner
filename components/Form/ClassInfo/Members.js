import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip, Table } from 'antd'
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



class Members extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }

  constructor(props) {
    super(props)
    this.inputChangeFunc = this.inputChangeFunc.bind(this)
  }
  componentWillMount() {
    const { data } = this.props
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

    const student10K = 'อายุไม่เกิน 19 ปี'
    let division = runnerGeneration[0].title

    if (this.props.distance.value === 10 && this.props.type.value === 'นักเรียน รับเสื้อ') {
      division = student10K
    }


    return `จัดอยู่ในรุ่น${division}`
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this
    const { members } = this.props.state.data

    const columns = [{
      title: 'ชื่อ',
      dataIndex: 'firstname',
      key: 'firstname',
    }, {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      key: 'lastname',
    }, {
      title: 'อายุ',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: 'ระยะทาง',
      dataIndex: 'distance',
      key: 'distance',
    }, {
      title: 'ขนาดเสื้อ',
      dataIndex: 'size',
      key: 'size',
    }]

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <Table dataSource={members} columns={columns} size="small" pagination={false} />
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
  }})(connect(mapStateToProps, mapDispatchToProps)(Members))
