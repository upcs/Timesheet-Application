import Login from "../comps/login";
import React from 'react';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Database from '../database-communication/database.js'
configure({ adapter: new Adapter() });

let wrapper
let appMain

beforeEach(() => {
    wrapper = shallow(<Login></Login>);
    //appMain = shallow(<App></App>)
    jest.useFakeTimers();
     
})


describe('A user can login succesfully', () => {
    it('Allows a user to enter an email address', () => {
        wrapper.find('#email').props().onChangeText("joey@gmail.com");
        expect(wrapper.state('email')).toEqual("joey@gmail.com");
    })

    it('Allows a user to enter a password', () => {
        wrapper.find('#password').props().onChangeText("test");
        expect(wrapper.state('password')).toEqual("test");
    })

    it('Allows a user to press the sign on button and confirms they are signed in', () => {
        data = new Database();
       
        wrapper.find('#email').props().onChangeText("joey@gmail.com");
        expect(wrapper.state('email')).toEqual("joey@gmail.com");

        wrapper.find('#password').props().onChangeText("test");
        expect(wrapper.state('password')).toEqual("test");

        wrapper.find('#signin').props().onPress();
        data.getSignIn(wrapper.state('email'), wrapper.state('password')).then((res, rej) => {
            expect(res[0]).not.toEqual("");
        });
    })
})