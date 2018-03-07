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
      shipmethod: Form.createFormField({
        ...props.shipmethod,
        value: props.shipmethod.value,
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
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }
  return (
    <Row gutter={16}>
      <Col {...colLayout}>
        <FormItem label="วิธีจัดส่ง">
          {getFieldDecorator('shipmethod', {
            rules: [{ required: true, message: 'กรุณาระบุวิธีจัดส่ง' }],
            onChange: e => changeCheckButton(e, 'shipmethod'),
            initialValue: props.shipmethod.value,
          })(
            <RadioGroup style={{ float: 'left' }}>
              <Radio style={radioStyle} value={1}><strong>ไปรษณีย์</strong> คนแรก 65 บาท คนที่ 2 เป็นต้นไปคนละ 35 บาท</Radio>
              <Radio style={radioStyle} value={1}><strong>รับด้วยตนเอง</strong> วันศุกร์ที่ xx มิถุนายน 2561 ตั้งแต่เวลา 12.00 – 19.00 น. ณ โรงเรียนสิริรัตนาธร</Radio>
            </RadioGroup>)}
        </FormItem>
      </Col>
    </Row>
  )
}))

export default Class
