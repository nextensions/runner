import React, { Component } from 'react'
import { Form, Input, Row, Col, Switch, Divider, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import Typeahead from '../../Typeahead/'
import { fieldsEnum, resolveResultbyField } from '../../Typeahead/finderAddress'

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

class Address extends Component {

  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
  }

  state = {
    cloneAddress: false,
  }

  inputChange = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }

  toggleCloneAddress = (checked) => {
    this.setState({
      cloneAddress: checked,
    })

    if (checked) {
      const { inputChange } = this.props

      inputChange('presentAddress', 'presentAddress', this.props.address.value)
      inputChange('presentAddress', 'presentMoo', this.props.moo.value)
      inputChange('presentAddress', 'presentSoi', this.props.soi.value)
      inputChange('presentAddress', 'presentStreet', this.props.street.value)

      // inputChange('presentAddress', 'presentSubDistrict', this.state.subDistrict)
      // inputChange('presentAddress', 'presentDistrict', this.state.district)
      // inputChange('presentAddress', 'presentProvince', this.state.province)
      // inputChange('presentAddress', 'presentZipcode', this.state.zipcode)
    }
  }
  handleChangeAddress = (address) => {
    const {
      a: subDistrict,
      d: district,
      p: province,
      z: zipcode,
    } = address
    const { inputChange } = this.props
    inputChange('address', 'subDistrict', subDistrict)
    inputChange('address', 'district', district)
    inputChange('address', 'province', province)
    inputChange('address', 'zipcode', zipcode)

    this.setState({
      ...this.state,
      subDistrict,
      district,
      province,
      zipcode,
    })

    if (this.state.cloneAddress) {
      inputChange('presentAddress', 'presentSubDistrict', subDistrict)
      inputChange('presentAddress', 'presentDistrict', district)
      inputChange('presentAddress', 'presentProvince', province)
      inputChange('presentAddress', 'presentZipcode', zipcode)
    }
  }
  handleChangePresentAddress = (address) => {

    if (this.state.cloneAddress) {
      return
    }
    const {
      a: subDistrict,
      d: district,
      p: province,
      z: zipcode,
    } = address
    const { inputChange } = this.props
    inputChange('presentAddress', 'presentSubDistrict', subDistrict)
    inputChange('presentAddress', 'presentDistrict', district)
    inputChange('presentAddress', 'presentProvince', province)
    inputChange('presentAddress', 'presentZipcode', zipcode)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { cloneAddress } = this.state
    const { props } = this

    const defaultAddress = {
      a: props.subDistrict.value,
      d: props.district.value,
      p: props.province.value,
      z: props.zipcode.value,
    }

    // const defaultAddress = {
    //   a: '',
    //   d: '',
    //   p: '',
    //   z: '',
    // }

    const defaultPresentAddress = {
      a: props.presentSubDistrict.value,
      d: props.presentDistrict.value,
      p: props.presentProvince.value,
      z: props.presentZipcode.value,
    }

    const cloneAddressLabel = cloneAddress ? 'ใช้ที่อยู่เดียวกับที่อยู่ตามบัตรประชาชน' : 'ใช้ที่อยู่เดียวกับที่อยู่ตามบัตรประชาชน'

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <Divider>ที่อยู่ตามบัตรประชาชน</Divider>
          <FormItem {...formItemLayout} label="บ้านเลขที่ หมู่บ้าน คอนโด">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'กรุณาระบุ บ้านเลขที่ หมู่บ้าน คอนโด' }],
              onChange: this.inputChange,
              // props: { defaultValue: this.props.address.value },
              initialValue: props.address.value,
            })(<Input title="address" placeholder="บ้านเลขที่ หมู่บ้าน คอนโด" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
              <FormItem {...formItemLayout} label="หมู่">
                {getFieldDecorator('moo', {
                  rules: [{ required: true, message: 'กรุณาระบุ ' }],
                  onChange: this.inputChange,
                  // props: { defaultValue: this.props.moo.value },
                  initialValue: props.moo.value,
                })(<Input title="address" placeholder="หมู่" />)}
              </FormItem>
            </Col>
            <Col span={1}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  &nbsp;
              </span>
            </Col>
            <Col {...colTrippleLayout}>
              <FormItem {...formItemLayout} label="ซอย">
                {getFieldDecorator('soi', {
                  rules: [{ required: true, message: 'กรุณาระบุ ซอย' }],
                  onChange: this.inputChange,
                  // props: { defaultValue: props.soi.value },
                  initialValue: props.soi.value,
                })(<Input title="address" placeholder="ซอย" />)}
              </FormItem>
            </Col>
            <Col span={1}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                  &nbsp;
              </span>
            </Col>
            <Col {...colTrippleTailLayout}>
              <FormItem {...formItemLayout} label="ถนน">
                {getFieldDecorator('street', {
                  rules: [{ required: true, message: 'กรุณาระบุ ' }],
                  onChange: this.inputChange,
                  // props: { defaultValue: props.street.value },
                  initialValue: props.street.value,
                })(<Input title="address" placeholder="ถนน" />)}
              </FormItem>
            </Col>
          </FormItem>

          <Typeahead
            kind="address"
            fieldsEnum={fieldsEnum}
            resolveResultbyField={resolveResultbyField}
            renderResult={(data) => {
              const provinceLabel = data.p === 'กรุงเทพมหานคร' ? '' : 'จังหวัด'
              const districtLabel = data.p === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ'
              const subDistrictLabel = data.p === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล'
              return (
                <div>
                  {subDistrictLabel}
                  <b>{data.d}</b> {districtLabel}
                  <b>{data.a}</b> {provinceLabel}
                  <b>{data.p}</b> รหัสไปรษณีย์
                  <b>{data.z}</b>
                </div>
              )
            }}
            onAddressSelected={addressObject => this.handleChangeAddress(addressObject)}
            defaultAddress={defaultAddress}
          />


          <Divider style={{ marginTop: 0 }}>ที่อยู่ปัจจุบัน</Divider>
          <Row>
            <Col span={24} style={{ textAlign: 'right', marginBottom: '24px' }}>
              {cloneAddressLabel} <Switch defaultChecked={cloneAddress} onChange={this.toggleCloneAddress} />
            </Col>
          </Row>
          {
            !cloneAddress ? (
              <div>
                <FormItem {...formItemLayout} label="บ้านเลขที่ หมู่บ้าน คอนโด">
                  {getFieldDecorator('presentAddress', {
                    rules: [{ required: !cloneAddress, message: 'กรุณาระบุ ' }],
                    onChange: this.inputChange,
                    // props: { defaultValue: props.presentAddress.value },
                    initialValue: props.presentAddress.value,
                  })(<Input title="presentAddress" placeholder="บ้านเลขที่ หมู่บ้าน คอนโด" />)}
                </FormItem>
                <FormItem {...formItemLayout}>
                  <Col {...colTrippleLayout} style={{ marginBottom: '16px' }}>
                    <FormItem {...formItemLayout} label="หมู่">
                      {getFieldDecorator('presentMoo', {
                        rules: [{ required: !cloneAddress, message: 'กรุณาระบุ ' }],
                        onChange: this.inputChange,
                        // props: { defaultValue: props.presentMoo.value },
                        initialValue: props.presentMoo.value,
                      })(<Input title="presentAddress" placeholder="หมู่" />)}
                    </FormItem>
                  </Col>
                  <Col span={1}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                        &nbsp;
                    </span>
                  </Col>
                  <Col {...colTrippleLayout}>
                    <FormItem {...formItemLayout} label="ซอย">
                      {getFieldDecorator('presentSoi', {
                        rules: [{ required: !cloneAddress, message: 'กรุณาระบุ ' }],
                        onChange: this.inputChange,
                        // props: { defaultValue: props.presentSoi.value },
                        initialValue: props.presentSoi.value,
                      })(<Input title="presentAddress" placeholder="ซอย" />)}
                    </FormItem>
                  </Col>
                  <Col span={1}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                        &nbsp;
                    </span>
                  </Col>
                  <Col {...colTrippleTailLayout}>
                    <FormItem {...formItemLayout} label="ถนน">
                      {getFieldDecorator('presentStreet', {
                        rules: [{ required: !cloneAddress, message: 'กรุณาระบุ ' }],
                        onChange: this.inputChange,
                        // props: { defaultValue: props.presentStreet.value },
                        initialValue: props.presentStreet.value,
                      })(<Input title="presentAddress" placeholder="ถนนe" />)}
                    </FormItem>
                  </Col>
                </FormItem>
                { /*
                  <Typeahead
                  kind="address"
                  renderResult={(data) => {
                    const provinceLabel = data.p === 'กรุงเทพมหานคร' ? '' : 'จังหวัด'
                    const districtLabel = data.p === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ'
                    const subDistrictLabel = data.p === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล'
                    return (
                      <div>
                        {subDistrictLabel}
                        <b>{data.d}</b> {districtLabel}
                        <b>{data.a}</b> {provinceLabel}
                        <b>{data.p}</b> รหัสไปรษณีย์
                        <b>{data.z}</b>
                      </div>
                    )
                  }}
                  onAddressSelected={addressObject => this.handleChangePresentAddress(addressObject)}
                  defaultAddress={defaultPresentAddress}
                />
                */}
              </div>
            ) : (
              <Row>
                <Col span={24} style={{ textAlign: 'center', marginBottom: '3px' }}>
                  <Button type="dashed" disabled>ไม่ต้องกรอกที่อยู่ปัจจุบัน เนื่องจากใช้ที่อยู่เดียวกับที่อยู่ตามบัตรประชาชน</Button>

                </Col>
              </Row>
            )
          }
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
  }})(connect(null, mapDispatchToProps)(Address))
