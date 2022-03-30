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
import AdminTimesheet from './comps/admin_timesheet';
import Employees from './comps/Employees';
import Card from './comps/Card';
import TimeCardStart from './comps/TimeCardStart';
import AdminJobsite from './comps/AdminJobsite';
import SearchBar from './comps/SearchBar';


import AdminEmployee from './comps/AdminEmployee'

//added
import { LogBox } from 'react-native';

const Tab = createMaterialTopTabNavigator();
import Database from './database-communication/database.js'

//added
LogBox.ignoreLogs(['Setting a timer for a long period of time'])



class App extends React.Component {   


  //state = { signedIn: 0, user: User.ADMIN };

  constructor(props) {
    super(props);
    // We pass the 'login' function into the Login component. We need to do this insted of making the function
    // in the actual login component becasue it needs to reference the 'App' scope in order to pass data to it.
    // If we pass functions to another component, by default they will be ran in their own context. using Function.bind
    // means that it will always use the scope of 'App'. in other words the 'this' keyword will always refernece the
    // same place as if the function was run here. at least i think so

    this.state = {
      signedIn: 0,
      id: '',
      user: ''
    }
    this.login = this.login.bind(this);

    this.data = new Database();
    
    //Performance testing
    this.start = new Date().getTime();
  }
  
  componentDidMount(){
    var end = new Date().getTime() - this.start;
    console.log('Performance App', end, 'ms');
  }

  login(signin, uid, uType) {
    this.setState({
      signedIn: signin,
      id: uid,
      user: uType
    }) 
  }

  loginAdmin() {
      this.setState({
        signedIn: 1,
        user: User.ADMIN,
      })
  }

  render() {
    
    //const signedIn = this.state.signedIn;
    //const isAdmin = this.state.user == User.ADMIN;
    return (
      <SafeAreaView style={safeAreaAndroid.SafeArea}>
      <NavigationContainer>
        <Tab.Navigator>
          {
          this.state.signedIn ? (
            this.state.user ? (
              // Logged in as admin
              <>


                <Tab.Screen name="TimeCardStart" component={TimeCardStart}></Tab.Screen>
                <Tab.Screen name="Timesheet" component={AdminTimesheet}></Tab.Screen>


                <Tab.Screen name="Employees" component={AdminEmployee}></Tab.Screen>

                <Tab.Screen name="Jobsite" component={AdminJobsite }></Tab.Screen>

              </>
            ) : (
              // Logged in as default user
              <>

                <Tab.Screen name="TimeCardStart" children={()=><TimeCardStart dataParentToChild={this.state.id}/>}/>
                <Tab.Screen name="Jobsite" component={Jobsite}></Tab.Screen>
                <Tab.Screen name="home" children={()=><EmployeeHours dataParentToChild={this.state.id}/>}/>

              </>
            )
          ) : (
            // Not logged in
            <Tab.Screen 
              name="Login"
              component={Login}
              initialParams={{
                login: this.login,
                loginAdmin: this.loginAdmin,
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
