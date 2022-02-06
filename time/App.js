import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Icon from './comps/Icon';

import Jobsite from './comps/Jobsite';
import Login from './comps/login';

import { Color } from './comps/Palette.js';
import User from './comps/User';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { UserInterfaceIdiom } from 'expo-constants';
import Timesheet from './comps/Timesheet';
import EmployeeHours from './comps/EmployeeHours.js';
import Employees from './comps/Employees';
import Card from './comps/Card';
import TimeCardStart from './comps/TimeCardStart';
const Tab = createMaterialTopTabNavigator();


class App extends React.Component {

  state = { signedIn: 0, user: User.DEFAULT };

  constructor(props) {
    super(props);
    // We pass the 'login' function into the Login component. We need to do this insted of making the function
    // in the actual login component becasue it needs to reference the 'App' scope in order to pass data to it.
    // If we pass functions to another component, by default they will be ran in their own context. using Function.bind
    // means that it will always use the scope of 'App'. in other words the 'this' keyword will always refernece the
    // same place as if the function was run here. at least i think so
    this.login = this.login.bind(this);
  }
  login() {
  /* login function in app should return some object representing server response
      example:
      {
        status: 0 or 1,
        username: string,
        type: User type
      }   */
      console.log("Attepting log in");
      this.setState({
        signedIn: 1,
        user: User.DEFAULT,
      })

  }

  render() {
    const signedIn = this.state.signedIn;
    const isAdmin = this.state.user == User.ADMIN;
    return (
      <SafeAreaView style={safeAreaAndroid.SafeArea}>
      <NavigationContainer>
        <Tab.Navigator>
          {
          signedIn ? (
            isAdmin ? (
              // Logged in as admin
              <>
                <Tab.Screen name="TimeCardStart" component={TimeCardStart}></Tab.Screen>
                <Tab.Screen name="Timesheet" component={Timesheet}></Tab.Screen>
                <Tab.Screen name="Employees" component={Employees}></Tab.Screen>
                <Tab.Screen name="Jobsite" component={Jobsite}></Tab.Screen>
              </>
            ) : (
              // Logge in as default user
              <>
                <Tab.Screen name="TimeCardStart" component={TimeCardStart}></Tab.Screen>
                <Tab.Screen name="Jobsite" component={Jobsite}></Tab.Screen>
                <Tab.Screen name="EmployeeHours" component={EmployeeHours}></Tab.Screen>
              </>
            )
          ) : (
            // Not logged in
            <Tab.Screen 
              name="Login"
              component={Login}
              initialParams={{
                login: this.login,
              }}
              ></Tab.Screen>
          )
        }          
        </Tab.Navigator>
      </NavigationContainer>   
      </SafeAreaView>
    );
  }
}

const bodyStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
});

const safeAreaAndroid = StyleSheet.create({
/* https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices*/
    SafeArea: {
      flex: 1,
      paddingTop: 30,//StatusBar?.currentHeight || 0,
    }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;