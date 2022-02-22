import React from 'react';
import { shallow } from 'enzyme';
import AddEmployee from '../comps/AddEmployee.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('test functionality of AddEmp', () => {

    it('Test if modal becomes visible when add employee is clicked', () => {
       const wrapper = shallow(<AddEmployee></AddEmployee>);
       wrapper.find('#addButton').props().onPress();
       expect(wrapper.find('#theModal').props().visible).toBe(true);
    });

    it('Test adding text input', () => {
      const wrapper = shallow(<AddEmployee></AddEmployee>);
      wrapper.find('#addButton').props().onPress();
      wrapper.find('#fInput').props().onChangeText("Tony");
      expect(wrapper.find('#fInput').props().value).toBe("Tony");
   });

   it('Test switching admin value', () => {
      const wrapper = shallow(<AddEmployee></AddEmployee>);
      wrapper.find('#aSwitch').props().onValueChange();
      expect(wrapper.find('#aSwitch').props().value).toBe(true);
   });

   it('Test adding value and closing modal', () => {
      const wrapper = shallow(<AddEmployee></AddEmployee>);
      wrapper.find('#addButton').props().onPress();
      wrapper.find('#aSwitch').props().onValueChange();
      wrapper.find('#fInput').props().onChangeText("Tony");
      wrapper.find('#theModal').props().onRequestClose();
      expect(wrapper.find('#aSwitch').props().value).toBe(true);
      expect(wrapper.find('#fInput').props().value).toBe("Tony");
   });

});