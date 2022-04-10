import AdminTimesheet from '../comps/admin_timesheet.js';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Database from '../database-communication/database.js'
configure({ adapter: new Adapter() });

let wrapper

beforeEach(() => {
    wrapper = shallow(<AdminTimesheet></AdminTimesheet>);
    jest.useFakeTimers();
})

describe('The component mounting', () => {
    it('Can mount when loaded', () => {
        instance = wrapper.instance();
        instance.componentDidMount();
        expect(wrapper.state('currEmployee')).toEqual(0);
    })
})

describe('An admin viewing employees times', () => {
    it('Updates the current employee when pressing on them', () => {
        var id = '25yc7J1yFzaT3OVt5H8J'
        instance = wrapper.instance();
        jest.spyOn(instance, 'getTime');
        instance.onListPress(id);
        expect(wrapper.state('currEmployee')).toEqual('25yc7J1yFzaT3OVt5H8J');
        expect(instance.getTime).toHaveBeenCalledTimes(1);
    })

    it('Updates the states dates when pressing on an employee', () => {
        var date = '----Mar-14-2022-'
        instance = wrapper.instance();
        instance.updateDates(date, 'From');
        expect(wrapper.state('date1month')).toBe('Mar');
        expect(wrapper.state('date1day')).toBe('14')
        expect(wrapper.state('date1year')).toBe('2022')
        instance.updateDates(date, 'To');
        expect(wrapper.state('date2month')).toBe('Mar');
        expect(wrapper.state('date2day')).toBe('14')
        expect(wrapper.state('date2year')).toBe('2022')
        instance.updateDates(date, 'somethingelse');
        expect(wrapper.state('date1month')).toBe(null);
        expect(wrapper.state('date1day')).toBe(null)
        expect(wrapper.state('date1year')).toBe(null)
        expect(wrapper.state('date2month')).toBe(null);
        expect(wrapper.state('date2day')).toBe(null)
        expect(wrapper.state('date2year')).toBe(null)
    })

    it('Can get the correct time per the correct date parameters', () => {
        instance = wrapper.instance();
        jest.spyOn(instance, 'getAllEmployeeTime');
        jest.spyOn(instance, 'getEmployeesTo');
        jest.spyOn(instance, 'getEmployeesFrom');
        jest.spyOn(instance, 'getEmployeesFromAndTo')

        wrapper.setState({date1: null});
        wrapper.setState({date2: null});
        wrapper.setState({currEmployee: '25yc7J1yFzaT3OVt5H8J'})
        instance.getTime('25yc7J1yFzaT3OVt5H8J');
        expect(instance.getAllEmployeeTime).toHaveBeenCalledTimes(1);

        wrapper.setState({date1: null});
        wrapper.setState({date2: 'test'});
        instance.getTime('25yc7J1yFzaT3OVt5H8J');
        expect(instance.getEmployeesTo).toHaveBeenCalledTimes(1);

        wrapper.setState({date1: 'test'});
        wrapper.setState({date2: null});
        instance.getTime('25yc7J1yFzaT3OVt5H8J');
        expect(instance.getEmployeesFrom).toHaveBeenCalledTimes(1);

        wrapper.setState({date1: 'test'});
        wrapper.setState({date2: 'test'});
        instance.getTime('25yc7J1yFzaT3OVt5H8J');
        expect(instance.getEmployeesFromAndTo).toHaveBeenCalledTimes(1);
    })

    it('Can get all of an employees time', () => {
        instance = wrapper.instance();
        jest.spyOn(instance.data, 'getAllTime');
        wrapper.setState({time: []})
        instance.getAllEmployeeTime('25yc7J1yFzaT3OVt5H8J');
        expect(wrapper.state('time')).not.toBe([]);
        expect(instance.data.getAllTime).toHaveBeenCalledTimes(1);
        instance.data.getAllTime('25yc7J1yFzaT3OVt5H8J');
        expect(wrapper.state('time')).not.toBe([]);

        data = new Database();
        data.getAllTime('25yc7J1yFzaT3OVt5H8J').then((res, rej) => {
            expect(res[0]).not.toBe(undefined);
        })
    })

    it('Can get an employees time from a certain date', () => {
        instance = wrapper.instance();
        jest.spyOn(instance.data, 'getTimeFrom');
        wrapper.setState({time: []})
        instance.getEmployeesFrom('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);
        expect(instance.data.getTimeFrom).toHaveBeenCalledTimes(1);
        instance.data.getTimeFrom('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);

        data = new Database();
        data.getTimeFrom('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022).then((res, rej) => {
            expect(res[0]).not.toBe(undefined);
        })
    })

    it('Can get an employees time to a certain date', () => {
        instance = wrapper.instance();
        jest.spyOn(instance.data, 'getTimeTo');
        wrapper.setState({time: []})
        instance.getEmployeesTo('25yc7J1yFzaT3OVt5H8J', 29, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);
        expect(instance.data.getTimeTo).toHaveBeenCalledTimes(1);
        instance.data.getTimeTo('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);

        data = new Database();
        data.getTimeTo('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022).then((res, rej) => {
            expect(res[0]).not.toBe(undefined);
        })
    })

    it('Can get an employees time over a range', () => {
        instance = wrapper.instance();
        jest.spyOn(instance.data, 'getTimeRanged');
        wrapper.setState({time: []})
        instance.getEmployeesFromAndTo('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022, 29, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);
        expect(instance.data.getTimeRanged).toHaveBeenCalledTimes(1);
        instance.data.getTimeRanged('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022, 29, 3, 2022);
        expect(wrapper.state('time')).not.toBe([]);

        data = new Database();
        data.getTimeRanged('25yc7J1yFzaT3OVt5H8J', 14, 3, 2022, 29, 3, 2022).then((res, rej) => {
            expect(res[0]).not.toBe(undefined);
        })
    })
})