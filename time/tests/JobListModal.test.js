import React from 'react';
import { mount, shallow } from 'enzyme';
import JobsList from '../comps/JobsList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

let wrapper
beforeEach(() => {
    wrapper = shallow(<JobsList></JobsList>);
})

describe('Modal Functionality', () => {
    it('Allows for job name to be changed', () => {
        wrapper.find('#jobName').props().onChangeText("Hello World");
        expect(wrapper.state('jobName')).toEqual("Hello World");
    })

    it('Allows for a jobs address to be changed', () => {
        wrapper.find('#jobAddress').props().onChangeText("New Address");
        expect(wrapper.state('address')).toEqual("New Address");
    })

    it('Allows for a button to be pressed that pulls up a list of employees', () => {
        wrapper.setState({isModalVisible: true, modalTwo: false});
        wrapper.find('#addEmployeeButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(false);
        expect(wrapper.state('modalTwo')).toBe(true);
        wrapper.find('#addEmployeeButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);
        expect(wrapper.state('modalTwo')).toBe(false);
    })
})