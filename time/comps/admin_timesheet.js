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
        this.currValue = this.currValue.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.state = {
            currEmployee: '',
            time: [], 
            date1: null,
            date1month: null,
            date1day: null,
            date1year: null, 
            date2: null,
            date2month: null,
            date2day: null,
            date2year: null, 
            query: [],
            jobsDataChild: [],
            requesting: false,
        };
        this.data = new Database();
    }

    componentDidMount = () => {
        this.setState({currEmployee: 0})
    }

    setQuery(newQuery) {
        return newQuery;
      }

    callbackFunction(childData) {
        console.log(childData);
        this.setState({jobsDataChild : childData});
        this.setState({requesting : false});
        console.log('callback recieved');
    }  

    getFilteredItems(query, items) {
        console.log("query: %s", query);
        if (!query || query.length == 0) {
          console.log("returning all items");
          console.log(items);
          return items;
        }
        console.log("filtering data based on query, query was: " + query);
        console.log(items);
        return items.filter((accounts) => (accounts.firstname.toString().toLowerCase() + " " + accounts.lastname.toString().toLowerCase() ).includes(query.toString().toLowerCase()));
    }

    currValue(newValue) {
        //console.log(newValue);
        this.setState({query : newValue});
        console.log(newValue);
        console.log("Here's the query in currValue");
        
        console.log(this.state.query);
  
        this.setState({requesting : true});
        console.log("Just set requesting to true in AdminEmployee");
        
        console.log(this.state.requesting);
        this.forceUpdate();
        
    }

    
  

    //When the list is pressed set the id of the employee pressed and get their time
    onListPress = (id) => {
        this.setState({currEmployee: id}); 
        this.getTime(id);
    }

    //Passed into the child, called when date gets updated, updates each date in the state
    updateDates = (date, cal) => {
        if(cal == "From"){
            this.setState(
                {
                    date1: date.toString().substring(4, 15),
                    date1month: date.toString().substring(4, 7),
                    date1day: date.toString().substring(8, 10),
                    date1year:date.toString().substring(11, 15)
                });
            
        }
        else if(cal == "To"){
            this.setState(
                {
                    date2: date.toString().substring(4, 15),
                    date2month: date.toString().substring(4, 7),
                    date2day: date.toString().substring(8, 10),
                    date2year:date.toString().substring(11, 15)
                });
        }
        else{
            this.setState(
                {
                    date1: null,
                    date1month: null,
                    date1day: null,
                    date1year: null, 
                    date2: null,
                    date2month: null,
                    date2day: null,
                    date2year: null, 
                });
            }
    }

    /**
     * Set the list of employee punches
     */
    getTime = (id) => {
        //If both dates are null get all punches
        if((this.state.date1 == null) && (this.state.date2 == null)){
            this.getAllEmployeeTime(id);
        }

        //If data 1 is null get time up to date 2
        else if(this.state.date1 == null){
            this.getEmployeesTo(id, this.state.date2day, this.state.date2month, this.state.date2year);
        }

        //If date 2 is null get time from date 1 
        else if(this.state.date2 == null){
            this.getEmployeesFrom(id, this.state.date1day, this.state.date1month, this.state.date1year);
        }

        //If both are not null get range of punches over time
        else{
            this.getEmployeesFromAndTo(id, this.state.date1day, this.state.date1month, this.state.date1year, 
                this.state.date2day, this.state.date2month, this.state.date2year);
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
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push(
                    res[i].month + "/" + res[i].day + "/" + res[i].year + "\n" +
                    res[i].totalPunchTimeInMinutes + "\n\n");
            }
            if(somedata.length <= 0){
                somedata.push("No time recorded for employee");
            }
            this.setState({time: somedata});
        });
    }

    /**
     * Get an employees time from the specified date 
     *
     * @author gabes
     */
    getEmployeesFrom(id, day, month, year){
        var somedata = [];
        this.data.getTimeFrom(id, day, month, year).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push(
                    res[i].month + "/" + res[i].day + "/" + res[i].year + "\n" +
                    res[i].totalPunchTimeInMinutes + "\n\n");
            }
            if(somedata.length <= 0){
                somedata.push("No time recorded for employee for specified (From date: " + day + " " + month + ", " + year + ")");
            }
            this.setState({time: somedata});
        });
    }

    /**
     * Get an employees time from the specified date 
     *
     * @author gabes
     */
     getEmployeesTo(id, day, month, year){
        var somedata = [];
        this.data.getTimeTo(id, day, month, year).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push(
                    res[i].month + "/" + res[i].day + "/" + res[i].year + "\n" +
                    res[i].totalPunchTimeInMinutes + "\n\n");
            }
            if(somedata.length <= 0){
                somedata.push("No time recorded for employee for specified (TO date: " + day + " " + month + ", " + year + ")");
            }
            this.setState({time: somedata});
        });
    }

    getEmployeesFromAndTo(id, fromDay, fromMonth, fromYear, toDay, toMonth, toYear){
        var somedata = [];
        this.data.getTimeRanged(id, fromDay, fromMonth, fromYear, toDay, toMonth, toYear).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push(
                    res[i].month + "/" + res[i].day + "/" + res[i].year + "\n" +
                    res[i].totalPunchTimeInMinutes + "\n\n");
            }
            if(somedata.length <= 0){
                somedata.push("No time recorded for employee for specified dates (From date: " + fromDay + " " + fromMonth + ", " + fromYear + ") and " + "(To date: " + toDay + " " + toMonth + ", " + toYear + ")");
            }
            this.setState({time: somedata});
        });
    }



    render() {

        this.filteredItems = this.getFilteredItems(this.state.query, this.state.jobsDataChild);

        return (
            // Vertical  layout 
            <View style={styles.vertical_layout}>


                 {/* Horizontal Layout for serch and date selection */}
                <View style={styles.horizontal_layout_top}>
                    <View style={styles.search}><SearchBar currValue={this.currValue}></SearchBar></View>
                     <CalendarButton updateDates={this.updateDates}></CalendarButton> 
                </View>

                {/* Horizontal Layout for employees and Hours  */}
                <View style={styles.horizontal_layout_bottom}>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={[styles.employees_hours, styles.text_employee]}>Employees:</Text>
                        <TimeSheetList onChange={this.onListPress} query={this.state.query} request={this.state.requesting} parentCallback={this.callbackFunction} data={this.filteredItems} style={styles.employees}> </TimeSheetList>
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