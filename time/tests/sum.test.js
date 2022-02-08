import React from 'react';
import { shallow } from 'enzyme';
import EmployeeHours from '../comps/EmployeeHours';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<EmployeeHours/>);
    });
});