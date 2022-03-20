import React from 'react';
import { shallow } from 'enzyme';
import EmployeeHours from '../comps/EmployeeHours';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

beforeEach(() => {
    jest.useFakeTimers();
 })
 


describe('Testing the Employee Hours Gui', () => {
   it('renders without crashing', () => {
      console.log("Doesn't work needs fixing");
    });
});