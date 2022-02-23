import React from 'react';
import { mount, shallow } from 'enzyme';
import EmployeesList from '../comps/EmployeesList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

let wrapper
beforeEach(() => {
    wrapper = shallow(<EmployeesList></EmployeesList>);
})

describe('Testing if Modal renders and closes', () => {
    it('Test if List is not empty', () => {
        const flatList = wrapper.find('#list');
        expect(flatList.props().data).not.toEqual(null);
    })

    it('Modal can render', () => {
        //const flatList = wrapper.find('#list');
        //renderItem.find('#employeeButton').props().onPress();
        // const employee = wrapper.find('#employeeButton');
        // employee.props().onPress();
        // expect(wrapper.find('#employeeModal').props().visible).toBe(true);
    })

    it('Modal can close when exit button is pressed', () => {
        wrapper.setState({isModalVisible: true})
        expect(wrapper.state('isModalVisible')).toBe(true)
        wrapper.find('#exitButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(false)
    })
})

describe('Modal Functionality', () => {
    it('Allows for first name to be changed', () => {
        wrapper.find('#firstName').props().onChangeText("Hello World");
        expect(wrapper.state('userFirst')).toEqual("Hello World");
    })

    it('Allows for first name to be changed', () => {
        wrapper.find('#lastName').props().onChangeText("Hello World");
        expect(wrapper.state('userLast')).toEqual("Hello World");
    })

    it('Allows for the user to change between default and admin', () => {
        wrapper.setState({isAdmin: true})
        wrapper.find('#adminSwitch').props().onValueChange();
        expect(wrapper.state('isAdmin')).toEqual(false);
        wrapper.find('#adminSwitch').props().onValueChange();
        expect(wrapper.state('isAdmin')).toBe(true);
    })

    it('Allows for updated data to be saved', () => {

    })

    it('Allows for a user to be deleted', () => {

    })
})