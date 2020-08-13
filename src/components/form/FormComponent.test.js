import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormComponent from './FormComponent';

configure({adapter: new Adapter()});

describe('FormComponent page check', ()=> {
    const formCmp = shallow(<FormComponent/>);
    it('should check if the form is present', ()=> {
        // console.log(formCmp.debug());
        // There must be only one <h1> for heading 
        expect(formCmp.find('Card')).toHaveLength(1);
    });
    
    it('should check if the Submit button text is present', ()=> {
        expect(formCmp.find('Button').at(0).text()).toEqual('Submit');
    });

    it('should check if the Reset button text is present', ()=> {
        expect(formCmp.find('Button').at(1).text()).toEqual('Reset');
    });

    /* it('should check title of the form card', ()=> {
        expect(formCmp.find('.ant-card-head-title')).contain('Student Registration Form');
    }); */

    /* it('should check default input', ()=> {
        let username = formCmp.find('input').first();
        username.simulate('change', {
            target: { value: 'tej'}
        });
        expect(username.props().value).toEqual('tejram');
    }); */
});