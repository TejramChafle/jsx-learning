
import axios from 'axios';
import { API_URL } from '../../config';
import { message } from 'antd';

export const ADD_STUDENT = 'ADD_STUDENT';
export const GET_STUDENTS = 'GET_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const returnStudents = (students, error) => {
    return {
        type: GET_STUDENTS,
        students: students,
        error: error
    }
}

export const returnStudent = (student, error) => {
    return {
        type: UPDATE_STUDENT,
        student: student,
        error: error
    }
}


export const getStudents = () => {
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.get(API_URL + 'students.json?auth=' + user.idToken)
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
                dispatch(returnStudents(students, false));
            }).catch(error => {
                console.log(error);
                dispatch(returnStudents([], true));
                message.error('Session expired, Please login.');
            });
    }
}

export const addStudent = (student) => {
    // console.log(student);
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.post(API_URL + 'students.json?auth=' + user.idToken, student)
            .then(response => {
                // console.log('student update response: ', response);
                message.success('Success! Student information saved successfully.');
                dispatch(returnStudent({ response }, false));
            }).catch(error => {
                console.log(error);
                message.error('Opps! Something went wrong. Unable to save student record.');
                dispatch(returnStudent(null, true));
            });
    }
}

export const updateStudent = (student) => {
    // console.log(student);
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.put(API_URL + 'students/' + student.key + '.json?auth=' + user.idToken, student)
            .then(response => {
                console.log('student update response: ', response);
                message.success('Success! Student information saved successfully.');
                dispatch(returnStudent({ response }, false));
            }).catch(error => {
                console.log(error);
                message.error('Opps! Something went wrong. Unable to save student record.');
                dispatch(returnStudent(null, true));
            });
    }
}

export const deleteStudent = (student) => {
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.delete(API_URL + 'students/' + student.key + '/.json?auth=' + user.idToken)
            .then(response => {
                console.log(response);
                message.success('Student record deleted.');
                dispatch(getStudents());
            }).catch(error => {
                console.log(error);
                message.error('Opps! Something went wrong. Unable to delete student record.');
            });
    }
}