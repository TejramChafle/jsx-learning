import React from 'react';
import { Card, Form, Input, Button, Select, Row, Col } from 'antd';
import * as classes from './Student.module.scss';

class FormComponent extends React.Component {
    formRef = React.createRef();
    user = JSON.parse(localStorage.getItem('auth'));
    state = {
        error: false,
        loading: false,
        message: ''
    }

    render() {
        // console.log(this.props);

        const onFinish = formdata => {
            console.log('onFinish data : ', formdata);
        }

        const onReset = () => {
            this.formRef.current.resetFields();
        };

        return (
            <Row className={classes.FormContainer} >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card title="Student Registration Form" bordered={true} className={classes.Form}>

                        {/* ERROR  MESSAGE*/}
                        {this.state.error && this.state.message}

                        {/* FORM */}
                        <Form name="basic" ref={this.formRef} name="control-ref" onFinish={onFinish}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Name is required' }
                                ]}
                            >
                                <Input type="text" placeholder="Name" maxLength="50"/>
                            </Form.Item>
                            <Form.Item
                                name="dob"
                                rules={[
                                    { required: true, message: 'Date of birth is required' }
                                ]}
                            >
                                <Input type="date"/>
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                rules={[
                                    { required: true, message: 'Gender is required' }
                                ]}
                            >
                                <Select label="Gender" placeholder="Gender">
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Email is required' }
                                ]}
                            >
                                <Input type="email" placeholder="Email" maxLength="50"/>
                            </Form.Item>
                            <Form.Item
                                name="class"
                                rules={[
                                    { required: true, message: 'Class is required' }
                                ]}
                            >
                                <Input type="text" placeholder="Class" maxLength="3"/>
                            </Form.Item>
                            <Form.Item style={{ float: 'right' }}>
                                <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                    {this.state.loading ? 'Saving..' : 'Submit'}
                                </Button>
                                <Button type="secondary" htmlType="button" style={{ marginLeft: '10px' }} onClick={onReset}>
                                    Reset
                            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default FormComponent;