import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Exams from './Exams';

configure({adapter: new Adapter()});

describe('Exams page heading check', ()=> {
    const exams = mount(<Exams/>);
    it('should check if the heading with h1 tag is present', ()=> {
        // console.log(exams.debug());
        // There must be only one <h1> for heading 
        expect(exams.find('h1')).toHaveLength(1);
    });

    let heading = 'Exams working!';
    it('should check if the heading is present as specified', ()=> {
        expect(exams.find('h1').text()).toEqual(heading);
    });
});