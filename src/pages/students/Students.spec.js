import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Students } from './Students';

configure({ adapter: new Adapter() });

describe('Students page table check', () => {
    const props = {
        propStudents: [
            { key: '1', name: 'John Doe', gender: 'Male', dob: '1992-12-12', class:'XI', email: 'johndoe@gmail.com' }
        ],
        propError: false,
        getStudent: ()=>{},
        onDelete:({})=>{} 
    }
    
    let students = shallow(<Students {...props}/>);
    it('should check if the table is present', () => {
        console.log(students.debug());
        // There must be only one <h1> for heading 
        expect(students.find('Table')).toHaveLength(1);
    });

    it('should check if the register student button is present', () => {
        expect(students.find('Button').text()).toEqual('Register Student');
    });

    it('should check if the length of the records populated is equal to the length', () => {
        students = shallow(<Students {...props}/>).instance();
        console.log(students);
        const total = students.props.propStudents.length;
        // There must be only one <h1> for heading 
        expect(parseInt(total)).toBe(props.propStudents.length);
    });
});