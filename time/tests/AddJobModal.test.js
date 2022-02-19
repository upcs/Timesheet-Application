import React from 'react';
import { mount, shallow } from 'enzyme';
import AddJobsite from '../comps/AddJobsite.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('test if AddEmployee renders', () => {
    it('Test if modal becomes visible when add employee is clicked', () => {
       const wrapper = shallow(<AddJobsite></AddJobsite>);
       wrapper.find('#addButton').props().onPress();
       expect(wrapper.find('#theModal').props().visible).toBe(true);
    });
    it('Test adding text input', () => {
      const wrapper = shallow(<AddJobsite></AddJobsite>);
      wrapper.find('#addButton').props().onPress();
      wrapper.find('#jnInput').props().onChangeText("Tony's Job");
      wrapper.find('#aInput').props().onChangeText("1234 hayden ave");
      expect(wrapper.find('#jnInput').props().value).toBe("Tony's Job");
      expect(wrapper.find('#aInput').props().value).toBe("1234 hayden ave");
   });


   it('Test adding value and closing modal', () => {
      const wrapper = shallow(<AddJobsite></AddJobsite>);
      wrapper.find('#addButton').props().onPress();
      wrapper.find('#jnInput').props().onChangeText("Tony's Job");
      wrapper.find('#theModal').props().onRequestClose();
      expect(wrapper.find('#jnInput').props().value).toBe("Tony's Job");
   });
});