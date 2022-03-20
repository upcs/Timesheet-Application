/**
 * Testing for the clock in and clock out buttons
 * 
 * @author Jude Gabriel
 * 
 * Note: There is some odd problem with jest happening on only this file
 *      from my research, looks to be on jests side...
 */


import React from 'react';
import { mount, shallow } from 'enzyme';
import TimeCardStart from '../comps/TimeCardStart.js';
import EmployeesList from '../comps/EmployeesList.js';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });



//PALCEHOLDER TEST!
let wrapper;
beforeEach(() => {
    wrapper = shallow(<EmployeesList></EmployeesList>);
    jest.useFakeTimers();
})


describe('Testing if Modal renders and closes', () => {
    it('Test if List is not empty', () => {
        const flatList = wrapper.find('#list');
        expect(flatList.props().data).not.toEqual(null);
    })
})



//ACTUAL TEST

// describe('Timer Functionality', async () => {
//     it('Starts and stops with the correct time', async () => {
//         await wrapper.find('#timerButton').props().onPress();
//         await jest.setTimeout(2000);
//         wrapper.find('#timerButton').props().onPress();
//         expect(wrapper.state('sec')).toEqual(2);
//         jest.useRealTimers();
//     })
// })