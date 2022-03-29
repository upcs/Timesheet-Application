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
    jest.useFakeTimers();
})

describe('The list loading', () => {
    it('Should check if component did mount', () => {
        const instance = wrapper.instance();;
        instance.componentDidMount();
        expect(wrapper.state('FakeData')).not.toBe([]);
    })
});


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

    it('Allows for updated data to be saved',  () => {
        data = new Database();
        var edited = '0rpiKLh7XdxjCcVMZsM9';
        wrapper.instance().updateEmployee();
        data.setUserFirst(edited, "Hello");
        data.setuserLast(edited, "World");
        data.setUserType(edited, 1);
        wrapper.instance().updateState();

        data.getAllAccounts().then((res, rej) => {
            console.log("res", res);
            wrapper.setState({FakeData: res});
            wrapper.setState({isModalVisible: true, userEdited: '25yc7J1yFzaT3OVt5H8J'});
            wrapper.find('#firstName').props().onChangeText("Hello");
            expect(wrapper.state('userFirst')).toEqual("Hello");
            wrapper.find('#lastName').props().onChangeText("World");
            expect(wrapper.state('userLast')).toEqual("World");
            wrapper.find('#adminSwitch').props().onValueChange();
            expect(wrapper.state('isAdmin')).toBe(true);
            wrapper.find('#saveChanges').props().onPress();
            
            expect(wrapper.state('FakeData')[0]).toStrictEqual({id: '25yc7J1yFzaT3OVt5H8J', firstname:'Hello', lastname: 'World', admin: 1, email: 'smith@gmail.com'})
        }).catch((err) => {
            console.log("err", err);
        })


        wrapper.setState({isModalVisible: true});
        wrapper.find('#saveChanges').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(false);
    })

    it('Allows for a user to be deleted', () => {
        const deleteUsrFunc = jest.spyOn(wrapper.instance(), "deleteUser");
        wrapper.setState({FakeData: FakeData, isModalVisible: true, userEdited: 1});
        Alert.alert = jest.fn();
        wrapper.find('#removeUser').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.instance().deleteUser(1);
        expect(deleteUsrFunc).toHaveBeenCalled();
    })
})