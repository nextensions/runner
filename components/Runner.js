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
import Class from '../components/Form/ClassInfo'
import Fee from '../components/Form/FeeInfo'
import Payment from '../components/Form/Payment'

class StudentProfile extends Component {
  render() {
    const stepContent = [
      {
        title: 'นักวิ่ง',
        content: <RegistrantInfo data={this.props.data} />,
      },
      {
        title: 'ประเภท',
        content: <Class data={this.props.data} />,
      },
      {
        title: 'เสื้อ',
        content: <Fee data={this.props.data} />,
      },
      {
        title: 'ชำระเงิน',
        content: <Payment data={this.props.data} />,
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
