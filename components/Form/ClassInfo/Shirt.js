import { Card, Form, Input, Row, Col, Radio, Divider, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderSchool'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Meta } = Card

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
    md: { span: 16 },
    lg: { span: 16 },
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


const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

const Shirt = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      size: Form.createFormField({
        ...props.size,
        value: props.size.value,
      }),
    }
  },
  onValuesChange(_, values) {
    console.log(values)
  },
})(connect(null, mapDispatchToProps)((props) => {
  const { getFieldDecorator } = props.form

  const inputChangeFunc = (e) => {
    const { inputChange } = props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }
  const changeWeight = (value) => {
    const { inputChange } = props
    inputChange('info', 'weight', value)
  }

  const changeHeight = (value) => {
    const { inputChange } = props
    inputChange('info', 'height', value)
  }

  const changeCheckButton = (e, name) => {
    const { inputChange } = props
    inputChange('info', name, e.target.value)
  }

  const setModalVisible = (modalVisible) => {
    console.log('hide')
    // this.setState({ modalVisible })
  }

  const defaultAddress = {
    s: props.prev_edu_name,
    a: props.prev_edu_sub_district,
    d: props.prev_edu_district,
    p: props.prev_edu_province,
  }

  const modalShirt = () => {
    const modal = Modal.success({
      width: '70%',
      visible: props.modalVisible,
      style: { top: 20 },
      title: 'ตัวอย่างแบบเสื้อ',
      content: (<img alt="แบบเสื้อ" src="static/images/shirt.png" style={{ width: '100%' }} />),
    })
  }

  return (
    <Row gutter={16} justify="center" type="flex">
      <Col {...colLayout}>
        <img alt="แบบเสื้อ" src="static/images/shirt-thumb.png" style={{ width: '100%' }} onClick={modalShirt} />
        <FormItem label="ขนาดเสื้อ">
          {getFieldDecorator('size', {
            rules: [{ required: true, message: 'กรุณาระบุขนาดเสื้อ' }],
            onChange: e => changeCheckButton(e, 'size'),
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
        </FormItem>
      </Col>
    </Row>
  )
}))

export default Shirt
