
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
              <Tab.Screen name="TimeCardStart" children={()=><TimeCardStart  sendData={addData} initialParams={{
                   signOutParent: this.signOut}} dataParentToChild={this.state.id}/>}/>
              <Tab.Screen name="Jobsite"children={()=><Jobsite dataParentToChild={this.state.id}/>}/>
              <Tab.Screen name="home"   children={()=><EmployeeHours ref={this.myref} dataParentToChild={this.state.id}/>}/>
            </>
      }          
      </Tab.Navigator>
      )
      }
    }
    export default BasicEmployeee;