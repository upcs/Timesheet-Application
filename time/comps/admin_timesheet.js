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
import TimeList from './TimeList'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Color } from './Palette';

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
        this.myref = React.createRef();
    }

    componentDidMount = () => {
        this.setState({currEmployee: 0})
    }

    setQuery(newQuery) {
        return newQuery;
      }

    callbackFunction(childData) {
        this.setState({jobsDataChild : childData});
        this.setState({requesting : false});
    }  

    getFilteredItems(query, items) {
        if (!query || query.length == 0) {
          return items;
        }
        return items.filter((accounts) => (accounts.firstname.toString().toLowerCase() + " " + accounts.lastname.toString().toLowerCase() ).includes(query.toString().toLowerCase()));
    }

    currValue(newValue) {
        this.setState({query : newValue});
        this.setState({requesting : true});
        this.forceUpdate();
        
    }

    
  

    /** 
     * When the list is pressed set the id of the employee pressed and get their time
     * 
     * @author gabes 
     */
    onListPress = (id) => {
        this.setState({currEmployee: id}); 
        this.getTime(id);
    }

    /** 
     * Passed into the child, called when date gets updated, updates each date in the state
     * 
     * @author gabes
     */
    updateDates = (date, cal) => {
        if(cal == "From"){
            this.setState(
                {
                    date1: date.toString().substring(4, 15),
                    date1month: date.toString().substring(4, 7),
                    date1day: date.toString().substring(8, 10),
                    date1year:date.toString().substring(11, 15)
                }, () => {
                    this.getTime(this.state.currEmployee);
                });
        }
        else if(cal == "To"){
            this.setState(
                {
                    date2: date.toString().substring(4, 15),
                    date2month: date.toString().substring(4, 7),
                    date2day: date.toString().substring(8, 10),
                    date2year:date.toString().substring(11, 15)
                }, () => {
                    this.getTime(this.state.currEmployee);
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
     * 
     * @author gabes
     */
    getTime = (id) => {
        if(id == '' || id == null){
            return;
        }

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
     * 
     * @author gabes
     */
    getAllEmployeeTime = (id) => {
        
        var somedata = [];
        this.data.getAllPunchSummary(id,false,false,0,0,0,0,0,0).then((res, rej) => {
            somedata.push({id: "1", date: "Total Time Summary", minutes: res});
        });
       
        this.data.getAllTime(id).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push({id: res[i].id, date:
                    res[i].month + "/" + res[i].day + "/" + res[i].year, minutes:
                    res[i].totalPunchTimeInMinutes,
                    timeIn: res[i].timeIn,
                });
            }
            if(somedata.length <= 1){
                somedata.push({id: "0", date: "No time recorded for employee", minutes: ""});
            }
            this.setTimes(somedata)
            this.myref.current.dataChange();
        });
    }

    /**
     * Get an employees time from the specified date 
     *
     * @author gabes
     */
    getEmployeesFrom(id, day, month, year){
        var somedata = [];
        this.data.getAllPunchSummary(id,true,false,0,0,0,day,month,year).then((res, rej) => {
            somedata.push({id: "1", date: "Total Time Summary", minutes: res});
        });
        this.data.getTimeFrom(id, day, month, year).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push({id: res[i].id, date:
                    res[i].month + "/" + res[i].day + "/" + res[i].year, minutes:
                    res[i].totalPunchTimeInMinutes,
                    timeIn: res[i].timeIn});
            }
            if(somedata.length <= 1){
                somedata.push({id: "0",date: "No time recorded for employee for specified (From date: " + day + " " + month + ", " + year + ")", minutes: ""});
            }
            this.setTimes(somedata)
            this.myref.current.dataChange();
        });
    }
    setTimes(data){
        data.forEach(entry => console.log("timrIn", entry, entry.timeIn));
        data.sort((a, b) => b.timeIn - a.timeIn);
        this.setState({time: data});
    }
    /**
     * Get an employees time from the specified date 
     *
     * @author gabes
     */
     getEmployeesTo(id, day, month, year){
        this.data.getAllPunchSummary(id,false,true,day,month,year,0,0,0).then((res, rej) => {
            somedata.push({id: "1", date: "Total Time Summary", minutes: res});
        });
        var somedata = [];
        this.data.getTimeTo(id, day, month, year).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push({id: res[i].id, date:
                    res[i].month + "/" + res[i].day + "/" + res[i].year, minutes:
                    res[i].totalPunchTimeInMinutes});
            }
            if(somedata.length <= 1){
                somedata.push({id: "0",date: "No time recorded for employee for specified (TO date: " + day + " " + month + ", " + year + ")", minutes: ""});
            }
            this.setTimes(somedata)
            this.myref.current.dataChange();
        });
    }

    getEmployeesFromAndTo(id, fromDay, fromMonth, fromYear, toDay, toMonth, toYear){
        var somedata = [];
        this.data.getAllPunchSummary(id,true,true,toDay,toMonth,toYear,fromDay,fromMonth,fromYear).then((res, rej) => {
            somedata.push({id: "1", date: "Total Time Summary", minutes: res});
        });
        this.data.getTimeRanged(id, fromDay, fromMonth, fromYear, toDay, toMonth, toYear).then((res, rej) => {
            if(res == undefined){
                return;
            }
            for(var i = 0; i < {res}.toString().length; i++){
                if(res[i] == undefined || res[i].totalPunchTimeInMinutes == undefined){
                    continue;
                }
                somedata.push({id: res[i].id, date:
                    res[i].month + "/" + res[i].day + "/" + res[i].year, minutes:
                    res[i].totalPunchTimeInMinutes });
            }
            if(somedata.length <= 1){
                somedata.push({id: "0",date: "No time recorded for employee for specified dates (From date: " + fromDay + " " + fromMonth + ", " + fromYear + ") and " + "(To date: " + toDay + " " + toMonth + ", " + toYear + ")", minutes: ""});
            }
            
            this.setTimes(somedata)
            this.myref.current.dataChange();
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
                        <Text style={[styles.employees_hours, styles.text_employee]}>Punches:
                        </Text>
                        
                        <TimeList style={styles.contentContainer} ref={this.myref} theEmp={this.state.currEmployee} hoursData={this.state.time}></TimeList>
                    </View>
                </View>
            </View>
        );
    }
}

//Styles used to create layout
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 400 
      },
    vertical_layout: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20
    },
    horizontal_layout_top: {
        flex: 0.15,
        flexDirection: "row", 
        marginBottom: 0,
        marginTop: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottomWidth: 1,
        backgroundColor: 'white'
        
    },
    horizontal_layout_bottom: {
        flex: 1,
        flexDirection: "row", 
        marginBottom: 0,
        marginTop: 1,
        backgroundColor: 'white'
    },
    employees_hours: {
        marginLeft: 0,
        fontSize: 30,
        marginTop: 0,
        padding: 0,
        borderLeftWidth: 1
    },
    text_date: {
        fontSize: 10,
        marginLeft: 10,
    },
    text_employee: {
        textDecorationLine: 'underline',
        color: 'black',
        fontWeight: 'bold'
    },
    search: {
        marginLeft: 10,
        backgroundColor: 'white'
    },
    hours: {
        textDecorationLine: 'none'
    }
});


export default AdminTimesheet; 