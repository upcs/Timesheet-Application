import React from 'react';
import { mount, shallow } from 'enzyme';
import JobsList from '../comps/JobsList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Alert } from 'react-native';
import { TestWatcher } from 'jest';
import Database from '../database-communication/database.js'
configure({ adapter: new Adapter() });

EmployeeData = [
    {id: 22, firstName: 'Employee', lastName: 'One', userType: 0}
]

EmployeeData2 = [
    {id: 23, firstName: 'Employee', lastName: 'Two', userType: 1}
]

JobData = [
    {id: 1, jobName: 'Job 1', address: '800 F St', employees: [
                                        {id: 1, firstName: 'Employee1', lastName: 'One', userType: 1},
                                    ]},                              
                                ]

let wrapper
beforeEach(() => {
    wrapper = shallow(<JobsList></JobsList>);
    jest.useFakeTimers();
     
})

describe('Modal 1 render', () => {
    it('Can open succesfully', () => {
        wrapper.setState({isModalVisible: false})
        jobs = shallow(wrapper.instance().renderItem({item: JobData}));
        jobs.find('#jobsView').find('#jobListButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);

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

    it('Allows for an employee to be deleted', () => {
        const getUsrFunc = jest.spyOn(wrapper.instance().data, "getJobEmployeesID");
        const deleteUsrFunc = jest.spyOn(wrapper.instance().data, "getJobEmployeesID")
        const upState = jest.spyOn(wrapper.instance(), "updateState")
        wrapper.setState({eList: EmployeeData});
        wrapper.setState({employeeEdited: 22})
        Alert.alert = jest.fn();
        employee = shallow(wrapper.instance().renderList({item: EmployeeData}));
        employee.find('#employeeJobView').find('#employeeInJob').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.instance().setEmployeeEdited(22);
        wrapper.instance().deleteUser();
        expect(getUsrFunc).toHaveBeenCalled();
        expect(deleteUsrFunc).toHaveBeenCalled();
        expect(upState).toHaveBeenCalled();
    })

    it('Allows for a job to be deleted', () => {
        wrapper.setState({FakeData: JobData, isModalVisible: true, jobEdited: 1});
        Alert.alert = jest.fn();
        wrapper.find('#removeJobButton').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.instance().deleteJob();
        expect(wrapper.state('FakeData')).toEqual([])
    })

    it('Allows for changes to be saved', () => {
        data = new Database();
        const setJob = jest.spyOn(wrapper.instance().data, "setJobName");
        const setAdd = jest.spyOn(wrapper.instance().data, "setJobAddress");
        const setEl = jest.spyOn(wrapper.instance(), "setEList")
        const upState = jest.spyOn(wrapper.instance(), "updateState")

        data.getAllAccounts().then((res, rej) => {
            console.log("res", res);
            wrapper.setState({FakeData: res});
            wrapper.setState({FakeData: JobData, isModalVisible: true, jobEdited: 1})
            wrapper.find('#jobName').props().onChangeText("Hello");
            expect(wrapper.state('jobName')).toEqual("Hello");
            wrapper.find('#jobAddress').props().onChangeText("World");
            expect(wrapper.state('address')).toEqual("World");
            wrapper.find('#saveJobChanges').props().onPress();
            expect(setJob).toHaveBeenCalled();
            expect(setAdd).toHaveBeenCalled();
            expect(setEl).toHaveBeenCalled();
            expect(upState).toHaveBeenCalled();

        }).catch((err) => {
            console.log("err", err);
        })
    })
})


describe('Modal 2 functionality', () => {
    it('Allows for an employee to be added', () => {
        Alert.alert = jest.fn();
        const addEmp = jest.spyOn(wrapper.instance().data, "addEmployeeToJob");
        const setEl = jest.spyOn(wrapper.instance(), "setEList")
        employee = shallow(wrapper.instance().renderEmployee({item: EmployeeData2}));
        employee.find('#employeeAddView').find('#employeeToAdd').props().onPress();
        expect(Alert.alert.mock.calls.length).toBe(1);
        wrapper.setState({eList: EmployeeData});
        wrapper.instance().addUser();
        expect(addEmp).toHaveBeenCalled();
        expect(setEl).toHaveBeenCalled();
    })

    it('Re-opens the first modal when closed', () => {
        wrapper.setState({isModalVisible: false, modalTwo: true});
        wrapper.find('#employeeModalExit').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);
        expect(wrapper.state('modalTwo')).toBe(false);
    })
})

