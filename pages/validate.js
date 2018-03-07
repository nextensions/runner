import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Steps, Button, message, Form, Select, Input } from 'antd'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../store'
import Wrapper from '../index'

import DisplayForm from '../components/DisplayForm'
import Runner from '../components/Runner'

const { Header, Content, Footer } = Layout

const Step = Steps.Step;
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

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}


const Email = (props) => {
  const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = props.form;
  const errors = getFieldError('email');
  const check = () => {
    props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }
  const getAlert = () => {
    alert('clicked');
  }
  return (
    <div>
      <FormItem {...formItemLayout} label="Name">
        {getFieldDecorator('username', {
          rules: [{
            required: true,
            message: 'Please input your name',
          }],
        })(
          <Input placeholder="Please input your name" />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="Nickname">
        {getFieldDecorator('nickname', {
          rules: [{
            required: true,
            message: 'Please input your nickname',
          }],
        })(
          <Input placeholder="Please input your nickname" />
        )}
      </FormItem>
      <FormItem {...formTailLayout}>
        <Button type="primary" onClick={check}>
          Check
        </Button>
      </FormItem>
    </div>
  )
}


class FormOne extends Component {
  // static propTypes = {
  //   form: PropTypes.object,
  // };
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.child.getAlert()
    // this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  };

  render() {
    const { current } = this.state;
    const { form } = this.props;

    const steps = [{
      title: 'First',
      content: <Email form={ form } ref={instance => { this.child = instance; }} />,
    }, {
      title: 'Second',
      content: 'Second-content',
    }, {
      title: 'Last',
      content: 'Last-content',
    }];

    return (
      <form onSubmit={this.onSubmit}>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </form>
    )
  }
}
const RunnerForm = Form.create()(FormOne)


class Admission extends Component {
  static async getInitialProps({
    store, isServer, pathname, query,
  }) {
    const data = await store.getState().data
    return { data }
  }

  render() {
    const { form } = this.props;

    return (
      <Wrapper>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">แบบฟอร์มรับสมัคร</Menu.Item>
              <Menu.Item key="2">E-Ticket (สำหรับรับเสื้อหน้างาน)</Menu.Item>
              <Menu.Item key="3">ขั้นตอนการสมัคร</Menu.Item>
              <Menu.Item key="4">รายละเอียดโครงการ</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <RunnerForm />
            </div>
            <DisplayForm />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Admission ©2018 Created by NextSchool</Footer>
        </Layout>
      </Wrapper>
    )
  }
}

export default withRedux(initStore, state => ({ ...state }))(Admission)
