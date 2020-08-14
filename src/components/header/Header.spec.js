
import React from 'react';
import { configure, mount } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

configure({adapter: new Adapter()});

describe('Header component antd tags check', ()=> {
    const header = mount(<Header/>);
    it('should check if PageHeader (with class .ant-page-header) is present', ()=> {
        expect(header.find('.ant-page-header')).toHaveLength(1);
    });

    it('should count menu items (with class .ant-menu-item) present', ()=> {
        expect(header.find('.ant-menu-item')).toHaveLength(6);
    });
});