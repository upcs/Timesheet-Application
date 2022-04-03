
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Jobsite from './Jobsite';
import React from 'react';
import EmployeeHours from './EmployeeHours.js';
import TimeCardStart from './TimeCardStart';
import AdminTimesheet from './admin_timesheet';
import AdminEmployee from './AdminEmployee';
import AdminJobsite from './AdminJobsite';
const Tab = createMaterialTopTabNavigator();
class AdminSide extends React.Component {  
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
            // Logged in as admin
            <>
            <Tab.Screen name="TimeCardStart"   children={()=><TimeCardStart initialParams={{
                   signOutParent: this.signOut}} sendData={addData} />}></Tab.Screen>
            <Tab.Screen name="Timesheet" component={AdminTimesheet}></Tab.Screen>
            <Tab.Screen name="Employees" component={AdminEmployee}></Tab.Screen>
            <Tab.Screen name="Jobsite" component={AdminJobsite }></Tab.Screen>

          </>
      }          
      </Tab.Navigator>
      )
      }
    }
    export default AdminSide;