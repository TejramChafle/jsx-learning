import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import * as classes from './Students.module.scss';
// import {} from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/student/actions';

class Students extends React.Component {
    user = JSON.parse(localStorage.getItem('auth'));
    cols = [
        /* {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        }, */
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Date of birth',
            dataIndex: 'dob',
            key: 'dob'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Space>
                    <Button htmlType="button" type="primary" onClick={() => this.onEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => this.onDelete(record)}
                        // onCancel={}
                        okText="Delete"
                        cancelText="No"
                    >
                        <Button className={classes.BtnDelete} >Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            error: false,
            loading: false,
            message: ''
        }
    }

    onDelete = (record) => {
        // console.log('onDelete', record);
        this.props.onDelete(record  );
        /* axios.delete(API_URL + 'students/' + record.key + '/.json?auth=' + this.user.idToken)
            .then(response => {
                console.log(response);
                this.componentDidMount();
                message.success('Student record deleted.');
            }).catch(error => {
                this.setState({ error: true });
                // this.setState({message: (<div className={classes.Error}>Username or password is incorrect!</div>)});
                console.log(error);
                this.setState({ loading: false });
                message.error('Opps! Something went wrong. Unable to delete student record.');
            }); */
    }

    onEdit = (student) => {
        console.log('onEdit', student);
        this.props.history.push({
            pathname: '/Student',
            state: {
                student
            }
        });
    }

    componentDidMount() {
        // console.log(API_URL + 'students.json?auth=' + this.user.idToken);
        /* this.setState({ loading: true });
        axios.get(API_URL + 'students.json?auth=' + this.user.idToken)
            .then(response => {
                // console.log(response);
                let students = [];
                for (let key in response.data) {
                    // console.log(response.data[key]);
                    students.push({
                        key: key,
                        name: response.data[key]['name'],
                        dob: response.data[key]['dob'],
                        gender: response.data[key]['gender'],
                        email: response.data[key]['email'],
                        // address: response.data[key]['address'],
                        class: response.data[key]['class']
                    })
                };
                this.setState({ students: students, loading: false });
                // console.log('STUDENTS: ', this.state.students);
            }).catch(error => {
                this.setState({ error: true });
                // this.setState({message: (<div className={classes.Error}>Username or password is incorrect!</div>)});
                console.log(error);
                this.setState({ loading: false });
                message.error('Session expired, Please login.');
                localStorage.clear();
                this.props.history.push({ pathname: '/login' });
            }); */
        this.props.getStudents();
    }

    navigate = () => {
        this.props.history.push({ pathname: '/student' });
    }

    componentDidUpdate() {
        console.log(this.props.stateStudents);
        console.log('stateStudentUpdated : ', this.props.stateStudentUpdated);
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this.navigate}
                    icon={<UserAddOutlined />}
                    style={{ float: 'right' }}
                    type="primary"
                >
                    Register Student
                </Button>
                <br />
                <h3>STUDENTS INFORMATION</h3>
                {/* <Table columns={this.cols} dataSource={this.state.students} bordered></Table> */}
                <Table columns={this.cols} dataSource={this.props.stateStudents} bordered></Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        stateStudents: state.students,
        stateStudentUpdated: state.updated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (student) => dispatch(actions.deleteStudent(student)),
        getStudents: () => dispatch(actions.getStudents()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);