import { Form, Input, Row, Col, Radio, Divider, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderSchool'

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

const Class = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      class: Form.createFormField({
        ...props.class,
        value: props.class.value,
      }),
      distance: Form.createFormField({
        ...props.distance,
        value: props.distance.value,
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

  return (
    <Row gutter={16}>
      <Col {...colLayout}>
        <FormItem label="ประเภท">
          {getFieldDecorator('class', {
            rules: [{ required: true, message: 'กรุณาระบุประเภท' }],
            onChange: e => changeCheckButton(e, 'class'),
            initialValue: props.class.value,
          })(
            <RadioGroup style={{ float: 'left' }}>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="นักเรียน">นักเรียน</RadioButton></Tooltip>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="ประชาชน">ประชาชน</RadioButton></Tooltip>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="vip">VIP</RadioButton></Tooltip>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="แฟนซี">แฟนซี</RadioButton></Tooltip>
            </RadioGroup>)}
        </FormItem>
        <FormItem label="ระยะทาง">
          {getFieldDecorator('distance', {
            rules: [{ required: true, message: 'กรุณาระบุระยะทาง' }],
            onChange: e => changeCheckButton(e, 'distance'),
            initialValue: props.distance.value,
          })(
            <RadioGroup style={{ float: 'left' }}>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="3K">3 กิโลเมตร</RadioButton></Tooltip>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="5K">5 กิโลเมตร</RadioButton></Tooltip>
              <Tooltip title="คำอธิบายสั้นๆ"><RadioButton value="10K">10 กิโลเมตร</RadioButton></Tooltip>
            </RadioGroup>)}
        </FormItem>
      </Col>
    </Row>
  )
}))

export default Class
