import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Radio, Divider, Tooltip, Modal, Collapse } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { runnerType, shirtSize } from '../../../config/'
import { inputChange } from '../../../actions'

const Panel = Collapse.Panel
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Meta } = Card

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

class Shirt extends Component {
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

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  modalShirt = () => {
    const shirtStyle =
      this.props.type.value === 'vip' ? 'static/images/shirtvip.png' : 'static/images/shirt.png'
    const modal = Modal.success({
      width: '70%',
      style: { top: 20 },
      title: 'ตัวอย่างแบบเสื้อ',
      content: <img alt="แบบเสื้อ" src={shirtStyle} style={{ width: '100%' }} />,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { props } = this
    const { state } = this

    const shirtStyle =
      props.type.value === 'vip' ? 'static/images/shirtvip.png' : 'static/images/shirt.png'
    return (
      <Row gutter={16} justify="center" type="flex">
        <Col {...colLayout}>
          <img
            alt="แบบเสื้อ"
            src={shirtStyle}
            style={{ width: '100%' }}
            onClick={this.modalShirt}
          />
          {/* <FormItem label="ขนาดเสื้อ">
            {getFieldDecorator('size', {
              rules: [{ required: true, message: 'กรุณาระบุขนาดเสื้อ' }],
              onChange: e => this.changeCheckButton(e, 'size'),
              initialValue: props.size.value,
            })(
              <RadioGroup style={{ float: 'left' }}>
                <Tooltip title={`รอบอก 34"`}><RadioButton value="SS"><strong>SS</strong> (34")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 36"`}><RadioButton value="S"><strong>S</strong> (36")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 38"`}><RadioButton value="M"><strong>M</strong> (38")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 40"`}><RadioButton value="L"><strong>L</strong> (40")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 42"`}><RadioButton value="XL"><strong>XL</strong> (42")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 44"`}><RadioButton value="2XL"><strong>2XL</strong> (44")</RadioButton></Tooltip>
                <Tooltip title={`รอบอก 46"`}><RadioButton value="3XL"><strong>3XL</strong> (46")</RadioButton></Tooltip>
              </RadioGroup>)}
            </FormItem> */}
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
  },
})(connect(null, mapDispatchToProps)(Shirt))
