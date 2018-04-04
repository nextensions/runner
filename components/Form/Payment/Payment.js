import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip, Upload, Icon, message, Card, Avatar, Modal } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { inputChange } from '../../../actions'
import { runnerType, shirtSize } from '../../../config/'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Dragger = Upload.Dragger
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



class Payment extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      url: '',
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  handleSuccess = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
    const { inputChange } = this.props
    inputChange('payment', 'url', file.url)
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    if (fileList.length) {
      if (fileList[0].response) {
        const { inputChange } = this.props
        inputChange('payment', 'url', fileList[0].response.url)
      }
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
            url: { value: info.url || this.state.fields.url.value },
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
  inputChange = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }
  setPayment = (fee, amount) => {
    const { inputChange } = this.props
    inputChange('payment', 'fee', fee)
    inputChange('payment', 'amount', amount)
  }

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">คลิกเพื่ออัปโหลด</p>
        <p className="ant-upload-hint">ไฟล์รูปภาพหลักฐานการโอนเงินขนาดไม่เกิน 5MB.</p>
      </div>
    )

    const { data } = this.props.state
    const runningFee = runnerType.filter(type => type.name === data.info.type)[0]
    const runningShirtInfo = shirtSize.filter(shirt => shirt.size === data.info.size)[0]
    const shippingFee = data.info.shipmethod !== 'pickup' ? 65 : 0

    const gender = [{ en: 'male', th: 'ชาย' }, { en: 'female', th: 'หญิง' }]

    // this.setPayment(shippingFee, runningFee.fee + shippingFee)

    const uploadProps = {
      name: 'file',
      multiple: false,
      action: process.env.CLOUDINARY_API_URL,
      data: {
        file: file => file,
        tags: 'nextschool, runner',
        upload_preset: process.env.CLOUDINARY_API_PRESET,
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp: (Date.now() / 1000),
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // beforeUpload(file) {
      //   console.log('beforeUpload', file.name)
      // },
      // onStart: (file) => {
      //   console.log('onStart', file.name)
      //   // this.refs.inner.abort(file);
      // },

      // // onProgress(step, file) {
      // //   console.log('onProgress', Math.round(step.percent), file.name);
      // // },
      // onError(err) {
      //   console.log('onError', err)
      // },
      onPreview(file) {
        this.handlePreview(file)
      },
      onChange(file) {
        this.handleChange(file)
      },
      // onSuccess(file) {
      //   this.handlePreview(file)
      // },
    }

    return (
      <Row gutter={16}>
        <Col {...colLayout}>
          <Row type="flex" justify="end">
            <Col span={4}>
              <Avatar src="static/images/ktb.png" style={{ width: '64px', height: '64px' }} />
            </Col>
            <Col span={20}>
              <strong style={{ fontSize: 22 }}>ธนาคารกรุงไทย</strong><br />
              <strong style={{ fontSize: 18 }}>สาขา : อุดมสุข</strong><br />
              <strong style={{ fontSize: 18 }}>ชื่อบัญชี : "เดิน - วิ่ง โดย โรงเรียน สิริรัตนาธร"</strong><br />
              <strong style={{ fontSize: 18 }}>เลขที่บัญชี : 259-0-30516-8</strong>
            </Col>
            <Divider />
            <Col span={12}>
              <strong style={{ fontSize: 22 }}>ยอดที่ต้องชำระ</strong>
            </Col>
            <Col span={12} align="right">
              <strong style={{ fontSize: 22 }}>
                {(runningFee.fee + shippingFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}{' '}
                บาท
              </strong>
            </Col>
          </Row>
          <Upload
            {...uploadProps}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length === 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
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
  }})(connect(mapStateToProps, mapDispatchToProps)(Payment))

