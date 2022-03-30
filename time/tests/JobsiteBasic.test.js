import React from 'react';
import { mount, shallow } from 'enzyme';
import Jobsite from '../comps/Jobsite'
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Alert } from 'react-native';
import { TestWatcher } from 'jest';
import Database from '../database-communication/database.js'
import JobsList from '../comps/JobsList';
configure({ adapter: new Adapter() });
FakeJob = [
    {id: 22, name: test, address: '1234 lane', phase : 1, notes: 'this is a test'}
]

let wrapper
beforeEach(() => {
    wrapper = shallow(<Jobsite></Jobsite>);
    jest.useFakeTimers();
     
})

describe('Job modal renders', () => {
    it('Can open succesfully', () => {
        wrapper.setState({isModalVisible: false})
        wrapper.find('#mainView').find('#openJobsView').find('#openJobs').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(true);

        wrapper.setState({isModalVisible: false});
        wrapper.instance().setModalVisible(!wrapper.state('isModalVisible'));
        expect(wrapper.state('isModalVisible')).toBe(true);
    })

    it('Can close successfully when X is pressed', () => {
        wrapper.setState({isModalVisible: true})
        expect(wrapper.state('isModalVisible')).toBe(true);
        wrapper.find('#closeButton').props().onPress();
        expect(wrapper.state('isModalVisible')).toBe(false);
    })
})