import React from 'react';
import { mount, shallow } from 'enzyme';
import AddEmployee from '../comps/AddEmployee.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('test if AddEmployee renders', () => {
    it('Test if modal becomes visible when add employee is clicked', () => {
       const wrapper = shallow(<AddEmployee></AddEmployee>);
       wrapper.find('#addButton').props().onPress();
       expect(wrapper.find('#theModal').props().visible).toBe(true);
    });
});