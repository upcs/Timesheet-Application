/******************************************
 * Component for the admin timesheet
 * 
 * Author: Jude Gabriel
 * Date: February 2. 2022
 *****************************************/


import React, {useEffect, useState} from 'react';
//import {Color, style} from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import SearchBar from './search_bar'




//Render the Company logo in the center of the screen 
//With a sign-in button underneath
class AdminTimesheet extends React.Component {
    render() {
        return (

            // Vertical  layout 
            <View style={styles.vertical_layout}>
                 {/* Horizontal Layout for serch and date selection */}
                <View style={styles.horizontal_layout_top}>
                    <SearchBar></SearchBar>
                    <Text> Search From: <Button title='Date'/> To: <Button title='Date'/>
                    </Text>
                </View>

                {/* Horizontal Layout for employees and Hours  */}
                <View style={styles.horizontal_layout_bottom}>
                    <Text style={styles.employees}>Employee</Text>
                    <Text style={styles.hours}>Hours</Text>
                </View>
                
            </View>
        
        
        
        );
    }
}


const styles = StyleSheet.create({
    vertical_layout: {
        marginTop: 40,
        flex: 1,
        backgroundColor: 'blue'
    },
    horizontal_layout_top: {
        flex: 0.1,
        flexDirection: "row", 
        marginBottom: 0,
        backgroundColor: 'yellow',
    },
    horizontal_layout_bottom: {
        flex: 1,
        flexDirection: "row", 
        marginBottom: 0,
        backgroundColor: 'blue'
    },
    search: {
        marginRight: 75,
        marginLeft: 20
    },
    employees: {
        marginRight: 75,
        marginLeft: 20,
        fontSize: 35
    }, 
    hours: {
        fontSize: 40
    }
});


export default AdminTimesheet;