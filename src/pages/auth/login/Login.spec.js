import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';

configure({adapter: new Adapter()});

describe('Login page check', ()=> {
    const login = shallow(<Login/>);
    console.log(login.debug());
    it('should check if the form is present', ()=> {
        expect(login.find('Card')).toHaveLength(1);
    });
    
    it('should check if the Submit button text is present', ()=> {
        expect(login.find('Button').at(0).text()).toEqual('Login');
    });

    it('should check the title of page', ()=> {
        expect(login.find('h1').text()).toEqual('JSX Learning');
    });

    let logoImage = login.find('img');
    console.log(logoImage.props());

    it('should check the logo image', ()=> {
        // expect(logoImage.props().src.contains(/\.svg/g)).toBe(true);
        expect(logoImage.props().src).toEqual('logo.svg');
        // expect(logoImage.props().src).toContain(/\.svg/g);
    });

    // Results incorrect result
    it('should check if the logo alt text is present', ()=> {
        expect(logoImage.props()).toContain('alt');
    });

    it('should check the logo image alt text', ()=> {
        expect(logoImage.props().alt).toEqual('jsx learning logo');
    });
});

// USERNAME VALIDATION
describe('Login page username & input validation check', ()=> {
    const login = shallow(<Login/>);
    let username = login.find('Input').first();
    let rule = { required: true, message: 'Username is required' };
    // console.log(username.debug());

    it('should check the input placeholder', ()=> {
        expect(username.props().placeholder).toEqual('Username');
    });

    it('should check the input type text', ()=> {
        expect(username.props().type).toEqual('text');
    });

    let usernameFormItem = login.find('FormItem').first();
    it('should check rules of username in FormItem', ()=> {
        expect(usernameFormItem.props().rules[0]).toEqual(rule);
    });

    it('should check if username is required', ()=> {
        expect(usernameFormItem.props().rules.filter(rule=>rule.required)).toHaveLength(1);
    });

    it('should check set input value', ()=> {
        // console.log(username.props());
        username.simulate('change', {
            target: { value: 'johndoe@gmail.com' }
        });
        username = login.find('Input').first();
        // console.log(username.props());
        expect(username.props().value).toEqual('johndoe@gmail.com');
    });
});


// PASSWORD VALIDATION
describe('Login page password & input validation check', ()=> {
    
    const login = shallow(<Login/>);
    let rule = { required: true, message: 'Password is required' };
    let password = login.find('FormItem').at(1);
    // console.log(password.props());

    it('should check rules of password in FormItem', ()=> {
        expect(password.props().rules[0]).toEqual(rule);
    });

    it('should check if password is required', ()=> {
        expect(password.props().rules.filter(rule=>rule.required)).toHaveLength(1);
    });

    let passwordInput = login.find('Password');
    it('should check if the placeholder of password is "password"', ()=> {
        // console.log(passwordInput.props());
        expect(passwordInput.props().placeholder).toEqual('Password');
    });

    it('should check the input type of password is "password"', ()=> {
        expect(passwordInput.props().type).toEqual('password');
    });
})