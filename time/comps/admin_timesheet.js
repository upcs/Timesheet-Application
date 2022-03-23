/******************************************
 * Component for the admin timesheet
 * 
 * Author: Jude Gabriel
 * Date: February 2. 2022
 *****************************************/


import React, {useRef, useEffect, useState} from 'react';
//import {Color, style} from './Palette.js';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Button} from 'react-native'
import SearchBar from './search_bar'
import TimeSheetList from './TimeSheetList';
import Menu from './Menu';
import CalendarButton from './calendar_button';
import Database from '../database-communication/database.js'


/**
 * Admin page to view timesheets of all employees
 */
class AdminTimesheet extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currEmployee: '',
            time: []
        };
        this.data = new Database();
    }

    componentDidMount = () => {
        this.setState({currEmployee: 0})
    }

    onListPress = (id) => {
        this.setState({currEmployee: id}); 
        this.getTime(id);
    }

    /**
     * Set the list of employee punches
     */
    getTime = (id, date1, date2) => {
        //If both dates are null get all punches
        if((date1 == null) && (date2 == null)){
            this.getAllEmployeeTime(id);
        }

        //If data 1 is null get time up to date 2
        else if(date1 == null){
        }

        //If date 2 is null get time from date 1 
        else{
        }
    }

    /**
     * Get all employee punches
     */
    getAllEmployeeTime = (id) => {
        var somedata = [];
        this.data.getAllTime(id).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined){
                    break;
                }
                somedata.push(
                    res[i].month + "/" + res[i].day + "/" + res[i].year + "\n" +
                    res[i].totalPunchTimeInMinutes + "\n\n");
            }
            this.setState({time: somedata});
        });
    }



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
                        <TimeSheetList onChange={this.onListPress} style={styles.employees}> </TimeSheetList>
                    </View>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={[styles.employees_hours, styles.text_employee]}>Hours:
                        </Text>
                        <ScrollView>
                        <Text style={styles.hours}>{this.state.time}</Text>
                        </ScrollView>
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
    },
    hours: {
        textDecorationLine: 'none'
    }
});


export default AdminTimesheet; 