import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';

import logo from './../../../logo.svg';
import * as classes from './Login.module.scss';
import { FIREBASE_CONFIG } from '../../../config';

class Login extends React.Component {
    state = {
        error: false,
        loading: false,
        message: ''
    }

    render() {
        // console.log(FIREBASE_CONFIG);
        console.log(this.props);

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 }
        }
        const tailLayout = {
            wrapperCol: {
                // offset: 8, 
                span: 24
            }
        }

        const onFinish = credentials => {
            // console.log('onFinish result : ', credentials);
            let auth = { email: credentials.username, password: credentials.password, returnSecureToken: true }
            this.setState({ loading: true });
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FIREBASE_CONFIG.apiKey, auth)
                .then(response => {
                    // console.log('logged in response: ', response);
                    localStorage.setItem('auth', JSON.stringify(response.data));
                    this.props.history.push({ pathname: '/dashboard' });
                    this.setState({ loading: false });
                }).catch(error => {
                    this.setState({ error: true });
                    this.setState({ message: (<div className={classes.Error}>Username or password is incorrect!</div>) });
                    console.log(error);
                    this.setState({ loading: false });
                });
        }

        const onFinishFailed = error => {
            console.log('onFinishFailed error : ', error);
        }

        const onSignup = (credentials) => {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_CONFIG.apiKey, credentials)
                .then(response => {
                    console.log(response);
                    localStorage.setItem('auth', JSON.stringify(response));
                    this.props.history.push({ pathname: '/dashboard' });
                    // window.location.reload();
                    this.setState({ loading: false });
                }).catch(error => {
                    this.setState({ error: true });
                    this.setState({ message: (<div className={classes.Error}>Email address is already in use!</div>) });
                    console.log(error);
                    this.setState({ loading: false });
                });
        }

        const navigate = () => {
            this.props.history.push({ pathname: '/students' });
        }

        return (
            <div className={classes.Login} >
                <div className={classes.LoginContainer} >
                    <Card bordered={true} className={classes.LoginCard}>

                        {/* BRANDING */}
                        <img src={logo} className={classes.Logo} alt="logo" />
                        <h1>JSX Learning</h1>
                        <br />

                        {/* ERROR MESSAGE */}
                        {this.state.error && this.state.message}

                        {/* LOGIN FORM */}
                        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item
                                // label="Username" 
                                name="username"
                                rules={[
                                    { required: true, message: 'Username is required' }
                                ]}
                            >
                                <Input placeholder="Username" prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item
                                // label="Password" 
                                name="password"
                                rules={[
                                    { required: true, message: 'Password is required' }
                                ]}
                            >
                                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                            </Form.Item>
                            <Form.Item {...tailLayout} >
                                <Button
                                    type="primary" htmlType="submit"
                                    disabled={this.state.loading} block
                                    icon={< LoginOutlined />}
                                >
                                    {this.state.loading ? 'Please wait..' : 'Login'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;