import React from 'react';
import { API_URL } from '../../../config';
import axios from 'axios';
import { Card, Form, Input, Button, Select, Row, Col } from 'antd';
import * as classes from './Student.module.scss';

class Student extends React.Component {
    formRef = React.createRef();
    user = JSON.parse(localStorage.getItem('auth'));
    state = {
        error: false,
        loading: false,
        message: ''
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.student) {
            this.formRef.current.setFieldsValue({
                name: this.props.location.state.student.name,
                gender: this.props.location.state.student.gender,
                dob: this.props.location.state.student.dob,
                class: this.props.location.state.student.class,
                email: this.props.location.state.student.email
            });
        }
    }
    
    render() {
        // console.log(this.props);

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }
        const tailLayout = {
            wrapperCol: { 
                offset: 8, 
                span: 16 }
        }

        const onFinish = data => {
            
            // console.log('onFinish data : ', data);

            if (this.props.location.state && this.props.location.state.student && this.props.location.state.student.key) {
                updateStudent(data);
            } else {
                this.setState({loading: true});
                axios.post(API_URL + 'students.json?auth=' + this.user.idToken, data)
                    .then(response => {
                        console.log('student registration response: ', response);
                        this.props.history.push({pathname: '/students'});
                        // window.location.reload();
                        this.setState({loading: false});
                    }).catch(error => {
                        this.setState({error: true});
                        this.setState({message: (<div className={classes.Error}>Username or password is incorrect!</div>)});
                        console.log(error);
                        this.setState({loading: false});
                    });
            }
        }

        const updateStudent = (student) => {
            this.setState({loading: true});
            axios.put(API_URL + 'students/'+this.props.location.state.student.key+'.json?auth=' + this.user.idToken, student)
                .then(response => {
                    console.log('student registration response: ', response);
                    this.props.history.push({pathname: '/students'});
                    // window.location.reload();
                    this.setState({loading: false});
                }).catch(error => {
                    this.setState({error: true});
                    this.setState({message: (<div className={classes.Error}>Username or password is incorrect!</div>)});
                    console.log(error);
                    this.setState({loading: false});
                });
        }

        return (
            <Row className={classes.FormContainer} >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Card title="Student Registration Form" bordered={true} className={classes.Form}>

                    {/* ERROR  MESSAGE*/}
                    {this.state.error && this.state.message}

                    {/* FORM */}
                    <Form  name="basic" ref={this.formRef} name="control-ref" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input type="text" placeholder="Name"/>
                        </Form.Item>
                        <Form.Item
                            name="dob"
                            rules={[
                                { required: true, message: 'Date of birth is required' }
                            ]}
                        >
                            <Input type="date" />
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
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input type="email" placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            name="class"
                            rules={[
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input type="text" placeholder="Class"/>
                        </Form.Item>
                        <Form.Item style={{float: 'right'}}>
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                {this.state.loading ? 'Saving..' : 'Submit'}
                            </Button>
                            <Button type="secondary" htmlType="button" style={{marginLeft: '10px'}}>
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

export default Student;