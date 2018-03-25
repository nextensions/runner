import React, { Component } from 'react'
import { Form, Input, Row, Col, Radio, Divider, Tooltip, Upload, Icon, message, Card, Avatar, Modal } from 'antd'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import axios from 'axios'

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
      fields: {
        type: { value: '' },
        distance: { value: '' },
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
            type: { value: info.type || this.state.fields.type.value },
            distance: { value: info.distance || this.state.fields.distance.value },
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
  inputChange = (e) => {
    const { inputChange } = this.props
    const { id, title, value } = e.target
    inputChange(title, id, value)
  }

  changeCheckButton = (e, name) => {
    const { inputChange } = this.props
    inputChange('info', name, e.target.value)
  }

  handleDrop = (files) => {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData()
      formData.append("file", file)
      formData.append("tags", `nextschool, runner`)
      formData.append("upload_preset", "ydk5ppag") // Replace the preset name with your own
      formData.append("api_key", "814213397314329") // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/pangpond/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then((response) => {
        const data = response.data
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(data)
      })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state

    const { data } = this.props.state
    const runningFee = runnerType.filter(type => type.name === data.info.type)[0]
    const runningShirtInfo = shirtSize.filter(shirt => shirt.size === data.info.size)[0]
    const shippingFee = data.info.shipmethod !== 'pickup' ? 65 : 0

    const gender = [{ en: 'male', th: 'ชาย' }, { en: 'female', th: 'หญิง' }]

    const uploadProps = {
      name: 'file',
      multiple: false,
      action: 'https://api.cloudinary.com/v1_1/pangpond/image/upload',
      data: {
        file: file => file,
        tags: 'nextschool, runner',
        upload_preset: 'ydk5ppag',
        api_key: '814213397314329',
        timestamp: (Date.now() / 1000) | 0,
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      beforeUpload(file) {
        console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        console.log('onStart', file.name);
        // this.refs.inner.abort(file);
      },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
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

          <Dropzone
            onDrop={this.handleDrop}
            multiple
            accept="image/*"
          >
            <p>Drop your files or click here to upload</p>
          </Dropzone>

          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">คลิกหรือลากไฟล์มายังพื้นที่นี้เพื่ออัปโหลด</p>
            <p className="ant-upload-hint">ไฟล์รูปภาพหลักฐานการโอนเงินขนาดไม่เกิน 5MB.</p>
          </Dragger>
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

export default connect(mapStateToProps)(Payment)
