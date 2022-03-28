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
})