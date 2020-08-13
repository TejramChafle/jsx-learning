import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Courses from './Courses';

configure({adapter: new Adapter()});

describe('Courses page heading check', ()=> {
    const courses = mount(<Courses/>);
    it('should check if the heading with h1 tag is present', ()=> {
        // console.log(courses.debug());
        // There must be only one <h1> for heading 
        expect(courses.find('h1')).toHaveLength(1);
    });

    let heading = 'Courses working!';
    it('should check if the heading is present as specified', ()=> {
        expect(courses.find('h1').text()).toEqual(heading);
    });
});


/* describe('Courses page heading check', ()=> {
    let heading = 'Courses working!';
    it('should check if the heading is present as specified', ()=> {
        let courses = mount(<Courses/>);
        expect(courses.find('h1').text()).toEqual(heading);
    });
}); */