import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Form,
  Input,
  Checkbox,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  LocaleProvider,
} from 'antd'

import { inputChange } from '../actions'

import Profile from '../components/Form/Profile/'
import Address from '../components/Form/Address'
import UI from '../components/Form/UI'
import FormIndex from '../components/Form/'
import RegisterForm from '../components/Form/Register'
import RegistrantInfo from '../components/Form/RegistrantInfo/'
import Education from '../components/Form/EducationInfo'

class StudentProfile extends Component {
  render() {
    const stepContent = [
      {
        title: 'นักวิ่ง',
        content: <RegistrantInfo data={this.props.data} />,
      },
      {
        title: 'ประเภท',
        content: <Education data={this.props.data} />,
      },
      {
        title: 'เสื้อ และการจัดส่ง',
        content: 'form Parent',
      },
      {
        title: 'ชำระเงิน',
        content: 'form Map',
      },
    ]

    return (
      <div>
        <RegisterForm stepContent={stepContent} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  inputChange: bindActionCreators(inputChange, dispatch),
})

export default Form.create()(connect(null, mapDispatchToProps)(StudentProfile))
