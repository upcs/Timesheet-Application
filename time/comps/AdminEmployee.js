/************************************************
 * Admin Jobsite Page
 * 
 * Author: Harrison Winters
 * Date: February 5, 2022
 ************************************************/

 import React from 'react';
 import {Color} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 import { useState } from 'react';
 import TimeSheetList from './TimeSheetList.js';
 import SearchBar from './search_bar.js';
import EmployeesList from './EmployeesList.js';  
import AddEmployee from './AddEmployee.js';
import FakeEmployeeData from './FakeEmployeeData.js';


 //Jobsite Selection with a search bar and "add jobsite" button
 class AdminEmployee extends React.Component {
   
     
     render() {
         let employList = {};
       
        const addData = (params) => {
            employList = params;
            console.log(employList);
        }

         return (
             <View style={styles.container}>
                 <View style={styles.upperbar}>
                    <SearchBar style={styles.search}></SearchBar>
                    
                    <View style={styles.buttonContainer}>
                        <AddEmployee sendData={addData} ></AddEmployee>
                    </View>
                    
                    
                </View>
                <EmployeesList></EmployeesList>
             </View>
         ) 
     }
 }
 
 /*  Styles used for login screen */
 const styles = StyleSheet.create({
     container: {
        //  alignItems: 'center', 
        //  justifyContent: 'center',
        //  flex: 0.8
        
     },

     upperbar: {
        
        display: 'flex',
        flexDirection: 'row',
        
     },

    //  logo: { 
    //      aspectRatio: 0.9, 
    //      resizeMode: 'contain'
    //  },
     add: {
       backgroundColor: Color.MAROON, 
       padding: 20, 
       marginTop: 12,
       borderRadius: 30,
       width: 100, 
       height: 10,
       alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
       marginHorizontal: 50,
       
    
     },
     text: {
         color: 'white',
         fontSize: 14,    
        position: 'absolute',
        // margin: 'auto',
        textAlign: 'center',
    },

    buttonContainer: {
       justifyContent: 'center', 
       position: 'relative',
    }
 });
 
 export default AdminEmployee;