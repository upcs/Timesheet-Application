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
import TimeSheetList from './TimeSheetList';
import Menu from './Menu';
import CalendarButton from './calendar_button';


/**
 * Admin page to view timesheets of all employees
 */
class AdminTimesheet extends React.Component {
    render() {
        return (
            // Vertical  layout 
            <View style={styles.vertical_layout}>
                 {/* Horizontal Layout for serch and date selection */}
                <View style={styles.horizontal_layout_top}>
                    <View style={styles.search}><SearchBar></SearchBar></View>
                     <CalendarButton></CalendarButton> 
                </View>

                {/* Horizontal Layout for employees and Hours  */}
                <View style={styles.horizontal_layout_bottom}>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={[styles.employees_hours, styles.text_employee]}>Employees:</Text>
                        <TimeSheetList style={styles.employees}></TimeSheetList>
                    </View>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={[styles.employees_hours, styles.text_employee]}>Hours:</Text>
                    </View>
                </View>
            </View>
        );
    }
}

//Styles used to create layout
const styles = StyleSheet.create({
    vertical_layout: {
        flex: 1,
    },
    horizontal_layout_top: {
        flex: 0.1,
        flexDirection: "row", 
        marginBottom: 0,
        marginTop: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottomWidth: 1
    },
    horizontal_layout_bottom: {
        flex: 1,
        flexDirection: "row", 
        marginBottom: 0,
        marginTop: 20
    },
    employees_hours: {
        marginLeft: 0,
        fontSize: 35,
        marginTop: 0,
        padding: 0,
        borderLeftWidth: 1
    },
    text_date: {
        fontSize: 10,
        marginLeft: 10
    },
    text_employee: {
        textDecorationLine: 'underline'
    },
    search: {
        marginLeft: 10
    }
});


export default AdminTimesheet; 