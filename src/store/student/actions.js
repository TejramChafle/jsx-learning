
import axios from 'axios';
import { API_URL } from '../../config';
import { message } from 'antd';

export const ADD_STUDENT = 'ADD_STUDENT';
export const GET_STUDENTS = 'GET_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

function resturnDeleteStudentResult(deleted) {
    return {
        type: DELETE_STUDENT,
        updated: deleted
    }
}

export const returnStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students: students
    }
}


export const getStudents = () => {
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.get(API_URL + 'students.json?auth=' + user.idToken)
        .then(response => {
            console.log(response);
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
            dispatch(returnStudents(students));
        }).catch(error => {
            console.log(error);
            message.error('Opps! Something went wrong. Unable to delete student record.');
        });     
    }
}

export const addStudent = (student) => {
    return {
        type: ADD_STUDENT,
        student: student
    }
}

export const updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student: student
    }
}

export const deleteStudent = (student) => {
    const user = JSON.parse(localStorage.getItem('auth'));
    return dispatch => {
        axios.delete(API_URL + 'students/' + student.key + '/.json?auth=' + user.idToken)
        .then(response => {
            console.log(response);
            message.success('Student record deleted.');
            // dispatch(resturnDeleteStudentResult(true));
            dispatch(getStudents());
        }).catch(error => {
            console.log(error);
            message.error('Opps! Something went wrong. Unable to delete student record.');
        });     
    }
}