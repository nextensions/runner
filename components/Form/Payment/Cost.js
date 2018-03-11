import { Card, Form, Input, Row, Col, Radio, Divider, Tooltip, Modal, Collapse } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderSchool'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Panel = Collapse.Panel

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

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

const Cost = Form.create({
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

  const defaultAddress = {
    s: props.prev_edu_name,
    a: props.prev_edu_sub_district,
    d: props.prev_edu_district,
    p: props.prev_edu_province,
  }

  const modalShirt = () => {
    const modal = Modal.success({
      title: 'This is a notification message',
      content: 'This modal will be destroyed after 1 second',
    })
    // setTimeout(() => modal.destroy(), 1000)
  }

  const callback = (key) => {
    console.log(key)
  }

  return (
    <Row type="flex" justify="end">
      <Col {...colLayout}>
        <Collapse defaultActiveKey={['1', '2']} onChange={callback}>
          <Panel header="ค่าสมัครวิ่ง" key="1">
            <Row type="flex" justify="end">
              <Col span={12}>ประเภท VIP ระยะทาง 10 กิโลเมตร</Col>
              <Col span={12} align="right">
                <strong>1,000 บาท</strong>
              </Col>
            </Row>
          </Panel>
          <Panel header="ค่าจัดส่งเสื้อ และเบอร์ BIB" key="2">
            <Row type="flex" justify="end">
              <Col span={12}>ไซต์ L (รอบอก 40") 1 ตัว</Col>
              <Col span={12} align="right">
                <strong>65 บาท</strong>
              </Col>
            </Row>
          </Panel>
          <Panel header="รวมทั้งสิ้น" key="2">
            <Row type="flex" justify="end">
              <Col span={12} align="right">
                <strong>1,065 บาท</strong>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  )
}))

export default Cost
