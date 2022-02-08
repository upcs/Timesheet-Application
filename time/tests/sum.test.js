import React from 'react';
import { shallow } from 'enzyme';
import EmployeeHours from '../comps/EmployeeHours';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      mount(<EmployeeHours/>);
    });
});