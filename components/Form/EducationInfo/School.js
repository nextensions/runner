import { Form, Input, Row, Col, Radio, Divider } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderSchool'

const FormItem = Form.Item

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

const Address = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      firstname: Form.createFormField({
        ...props.firstname,
        value: props.firstname.value,
      }),
      lastname: Form.createFormField({
        ...props.lastname,
        value: props.lastname.value,
      }),
      gender: Form.createFormField({
        ...props.gender,
        value: props.gender.value,
      }),
      blood: Form.createFormField({
        ...props.blood,
        value: props.blood.value,
      }),
      religion: Form.createFormField({
        ...props.religion,
        value: props.religion.value,
      }),
      nationality: Form.createFormField({
        ...props.nationality,
        value: props.nationality.value,
      }),
      race: Form.createFormField({
        ...props.race,
        value: props.race.value,
      }),
      mobile: Form.createFormField({
        ...props.mobile,
        value: props.mobile.value,
      }),
      email: Form.createFormField({
        ...props.email,
        value: props.email.value,
      }),
      weight: Form.createFormField({
        ...props.weight,
        value: props.weight.value,
      }),
      height: Form.createFormField({
        ...props.height,
        value: props.height.value,
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

  const handleChangeAddress = (address) => {
    const {
      s: prev_edu_name,
      a: prev_edu_sub_district,
      d: prev_edu_district,
      p: prev_edu_province
    } = address

    // this.setState({
    //   prev_edu_name,
    //   prev_edu_sub_district,
    //   prev_edu_district,
    //   prev_edu_province,
    // })
  }

  const defaultAddress = {
    s: props.prev_edu_name,
    a: props.prev_edu_sub_district,
    d: props.prev_edu_district,
    p: props.prev_edu_province,
  }

  return (
    <Row gutter={16}>
      <Col {...colLayout}>
        <Typeahead
          kind="school"
          fieldsEnum={fieldsEnum}
          resolveResultbyField={resolveResultbyField}
          renderResult={(data) => {
            const provinceLabel = data.p === 'กรุงเทพมหานคร' ? '' : 'จังหวัด'
            const districtLabel = data.p === 'กรุงเทพมหานคร' ? '' : 'อำเภอ'
            const subDistrictLabel = data.p === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล'
            return (
              <div>
                โรงเรียน
                <b>{data.s}</b> {provinceLabel}
                <b>{data.p}</b> {subDistrictLabel}
                <b>{data.d}</b> {districtLabel}
                <b>{data.a}</b>
              </div>
            )
          }}
          onAddressSelected={addressObject => handleChangeAddress(addressObject)}
          defaultAddress={defaultAddress}
        />
      </Col>
    </Row>
  )
}))

export default Address
