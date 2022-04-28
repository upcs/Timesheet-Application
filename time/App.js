import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

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

import TimeCardStart from './comps/TimeCardStart';
import AdminJobsite from './comps/AdminJobsite';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminEmployee from './comps/AdminEmployee';
//added
import { LogBox, Image} from 'react-native';

const Tab = createMaterialTopTabNavigator();
import Database from './database-communication/database.js'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notification

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
    this.myref = React.createRef();
    this.signOut = this.signOut.bind(this);
    this.updateList = this.updateList.bind(this);
    this.timeCardRef = React.createRef();

  }
  

  /**
   * Sends performance testing to console
   * 
   * @author gabes
   */
  componentDidMount(){
    var end = new Date().getTime() - this.start;
    console.log('Performance App', end, 'ms');
  }


  /**
   * Sets the state from user sign in 
   * 
   */
  login(signin, uid, uType) {
    this.setState({
      signedIn: signin,
      id: uid,
      user: uType
    }) 
  }


  /**
   * Updates the picker list. Called when a user is added or removed from a job
   * 
   * @author gabes
   */
  updateList(){
    this.timeCardRef.current.updateJobList();
  }

  /**
   * Signs user out by setting state back to defaut
   * 
   * Called by sign out button in timecardstart
   * 
   * @author gabes
   */
  signOut(){
    this.setState({
      signedIn: 0,
      id: '',
      user: ''
    })
  }

  render() {
    //This function is called whenever you clockout
    const addData = () => {
      this.myref.current.updateState();
   }
    //const signedIn = this.state.signedIn;
    //const isAdmin = this.state.user == User.ADMIN;
    return (
      <SafeAreaView style={safeAreaAndroid.SafeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'TimeCardStart') {
                iconName = require("./assets/clock.png");
              } else if (route.name === 'Timesheet') {
                iconName = require("./assets/jobs.png");
              }
              else if (route.name === 'Employees') {
                iconName= require("./assets/emp.png")
              }
              else if (route.name === 'Jobsite') {
                iconName = require("./assets/site.png")
              }
              else if (route.name === 'BasicJobsite') {
                iconName = require("./assets/site.png")
              }
              else if (route.name === 'home') {
                iconName = require("./assets/jobs.png")
              }
  
              // You can return any component that you like here!
              return  <Image source={iconName}      style={[{flex:1, resizeMode: 'stretch'},{ height: size, width: size}]}/>
            },
            tabBarActiveTintColor: Color.MAROON,
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false
          })}
        >
          {
          this.state.signedIn ? (
            this.state.user ? (
              // Logged in as admin
                  <>
                  <Tab.Screen name="TimeCardStart" id="tcs" children={()=><TimeCardStart  ref={this.timeCardRef} initialParams={{
                        signOutParent: this.signOut}} sendData={addData} />}></Tab.Screen>
                  <Tab.Screen name="Timesheet" component={AdminTimesheet}></Tab.Screen>
                  <Tab.Screen name="Employees" component={AdminEmployee}></Tab.Screen>
                  <Tab.Screen name="Jobsite" children={() => <AdminJobsite initialParams={{updateList: this.updateList}}/>}></Tab.Screen>
      
                </>
                     
           
            ) : (
              // Logged in as default user
                  <>
                    <Tab.Screen name="TimeCardStart" children={()=><TimeCardStart  ref={this.timeCardRef} sendData={addData} initialParams={{
                         signOutParent: this.signOut}} dataParentToChild={this.state.id}/>}/>
                    <Tab.Screen name="BasicJobsite"children={()=><Jobsite dataParentToChild={this.state.id}/>}/>
                    <Tab.Screen name="home"   children={()=><EmployeeHours ref={this.myref} dataParentToChild={this.state.id}/>}/>
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
