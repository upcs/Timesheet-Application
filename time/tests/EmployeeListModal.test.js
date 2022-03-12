/*************************************
 * Testing for Employee List Modal
 * 
 * Author: Jude Gabriel
 ***********************************/

import React from 'react';
import { mount, shallow } from 'enzyme';
import EmployeesList from '../comps/EmployeesList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Alert } from 'react-native';
import Database from '../database-communication/database.js'
configure({ adapter: new Adapter() });


FakeData = [
    {id: 1, firstName: 'Employee', lastName: 'One', userType: 0}
]

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
        wrapper.setState({isModalVisible: false});
        eModal = shallow(wrapper.instance().renderItem({item: FakeData}));
        eModal.find('#employeeButtonView').find('#employeeButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);

        wrapper.setState({isModalVisible: false})
        wrapper.instance().setModalVisible(!wrapper.state('isModalVisible'));
        expect(wrapper.state('isModalVisible')).toBe(true);
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

    it('Allows for updated data to be saved', async () => {
        data = new Database();
        await data.getAllAccounts().then((res, rej) => {
            wrapper.setState({FakeData: res}, () => {
               console.log(wrapper.state('FakeData'));
            });
        });

       // wrapper.setState({FakeData: [{firstName: 'John', lastName: 'Smith'}]});
        //console.log(wrapper.state('FakeData'));
        wrapper.setState({isModalVisible: true, userEdited: '25yc7J1yFzaT3OVt5H8J'});
        wrapper.find('#firstName').props().onChangeText("Hello");
        expect(wrapper.state('userFirst')).toEqual("Hello");
        wrapper.find('#lastName').props().onChangeText("World");
        expect(wrapper.state('userLast')).toEqual("World");
        wrapper.find('#adminSwitch').props().onValueChange();
        expect(wrapper.state('isAdmin')).toBe(true);
        await wrapper.find('#saveChanges').props().onPress();
        
        //expect(wrapper.state('FakeData')[0]).toStrictEqual({id: '25yc7J1yFzaT3OVt5H8J', firstname:'Hello', lastname: 'World', admin: 1, email: 'smith@gmail.com'})
    })

    it('Allows for a user to be deleted', () => {
        wrapper.setState({FakeData: FakeData, isModalVisible: true, userEdited: 1});
        Alert.alert = jest.fn();
        wrapper.find('#removeUser').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.instance().deleteUser();
        expect(wrapper.state('FakeData')).toEqual([]);
    })
})