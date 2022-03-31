
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Jobsite from './Jobsite';
import React from 'react';
import EmployeeHours from './EmployeeHours.js';
import TimeCardStart from './TimeCardStart';
const Tab = createMaterialTopTabNavigator();
class BasicEmployeee extends React.Component {  
    constructor(props) {
        super(props);
        // We pass the 'login' function into the Login component. We need to do this insted of making the function
        // in the actual login component becasue it needs to reference the 'App' scope in order to pass data to it.
        // If we pass functions to another component, by default they will be ran in their own context. using Function.bind
        // means that it will always use the scope of 'App'. in other words the 'this' keyword will always refernece the
        // same place as if the function was run here. at least i think so
    
        this.state = {
            id: this.props.dataParentToChild
        }
       // this.login = this.login.bind(this);
        this.myref = React.createRef();
    
      } 
render(){
    const addData = () => {
        this.myref.current.updateState();
     }
return (
      <Tab.Navigator>
        {
            // Logged in as default user
            <>
              <Tab.Screen name="TimeCardStart" children={()=><TimeCardStart  sendData={addData} dataParentToChild={this.state.id}/>}/>
              <Tab.Screen name="Jobsite"children={()=><Jobsite dataParentToChild={this.state.id}/>}/>
              <Tab.Screen name="home"   children={()=><EmployeeHours ref={this.myref} dataParentToChild={this.state.id}/>}/>
            </>
      }          
      </Tab.Navigator>
      )
      }
    }
    export default BasicEmployeee;