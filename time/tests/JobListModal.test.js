import React from 'react';
import { mount, shallow } from 'enzyme';
import JobsList from '../comps/JobsList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Alert } from 'react-native';
import { TestWatcher } from 'jest';
configure({ adapter: new Adapter() });

EmployeeData = [
    {id: 22, firstName: 'Employee', lastName: 'One', userType: 0}
]

JobData = [
    {id: 1, jobName: 'Job 1', address: '800 F St', employees: [
                                        {id: 1, firstName: 'Employee1', lastName: 'One', userType: 1},
                                    ]},                              
                                ]

let wrapper
beforeEach(() => {
    wrapper = shallow(<JobsList></JobsList>);
})

describe('Modal 1 render', () => {
    it('Can open succesfully', () => {
        wrapper.setState({isModalVisible: false});
        wrapper.instance().setModalVisible(!wrapper.state('isModalVisible'));
        expect(wrapper.state('isModalVisible')).toBe(true);
    })

    it('Has a list that is not empty', () => {
        const flatList = wrapper.find('#jobsList');
        expect(flatList.props().data).not.toEqual(null);
    })

    it('Can close successfully when X is pressed', () => {
        wrapper.setState({isModalVisible: true})
        expect(wrapper.state('isModalVisible')).toBe(true)
        wrapper.find('#jobModalExit').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(false)
    })
})


describe('Modal 2 render', () => {
    it('Can open succesfully', () => {
        wrapper.setState({modalTwo: false});
        wrapper.instance().setModalTwo(!wrapper.state('modalTwo'));
        expect(wrapper.state('modalTwo')).toBe(true);
    })

    it('Has a list that is not empty (all non job employees)', () => {
        const flatList = wrapper.find('#addEmployeeList');
        expect(flatList.props().data).not.toEqual(null);
    })

    it('Can close successfully', () => {
        wrapper.setState({modalTwo: true});
        expect(wrapper.state('modalTwo')).toBe(true)
        wrapper.find('#employeeModalExit').props().onPress();
        expect(wrapper.state('modalTwo')).toBe(false)
    })
})

describe('Modal 1 funcitonality', () => {
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
    })

    it('Allows for a user to be deleted', () => {
        wrapper.setState({eList: EmployeeData});
        wrapper.setState({employeeEdited: 22})
        Alert.alert = jest.fn();
        employee = shallow(wrapper.instance().renderList({item: EmployeeData}));
        employee.find('#employeeJobView').find('#employeeInJob').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.instance().setEmployeeEdited(22);
        wrapper.instance().deleteUser();
        expect(wrapper.find('#employeeJobList').props().data).toEqual([]);
    })

    it('Allows for a job to be deleted', () => {

    })

    it('Allows for changes to be saved', () => {

    })
})


describe('Modal 2 functionality', () => {
    it('Allows for an employee to be added', () => {

    })

    it('Re-opens the first modal when closed', () => {
        wrapper.setState({isModalVisible: false, modalTwo: true});
        wrapper.find('#employeeModalExit').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);
        expect(wrapper.state('modalTwo')).toBe(false);
    })
})

