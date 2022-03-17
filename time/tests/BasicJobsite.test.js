import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Jobsite from '../comps/Jobsite.js';
configure({ adapter: new Adapter() });

describe('test Basic Jobsite', () => {
    it('test if Jobsite renders', () => {
       const wrapper = shallow(<Jobsite></Jobsite>);
    });
});