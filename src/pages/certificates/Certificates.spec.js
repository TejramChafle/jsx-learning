import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Certificates from './Certificates';

configure({adapter: new Adapter()});

describe('Certificates page heading check', ()=> {
    const certificates = mount(<Certificates/>);
    it('should check if the heading with h1 tag is present', ()=> {
        // console.log(certificates.debug());
        // There must be only one <h1> for heading 
        expect(certificates.find('h1')).toHaveLength(1);
    });

    let heading = 'Certificates working!';
    it('should check if the heading is present as specified', ()=> {
        expect(certificates.find('h1').text()).toEqual(heading);
    });
});