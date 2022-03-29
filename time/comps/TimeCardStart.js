/************************************************
 * Time Card Start Menu
 * 
 * Update: added timer functionality
 * Author: Jude Gabriel 
 * 
 * Author: Harrison Winters (Build off of Jude Gabriel's Login component)
 * Date: February 5, 2022
 ************************************************/


 
 
 //Company Logo with large "Start" button in the center of the screen

import React from 'react';
import {Color} from './Palette.js';

import { Picker, Text, View, StyleSheet, TouchableOpacity, Image, DatePickerIOSBase} from 'react-native'
import TimeUtil from './TimeUtil.js';


import Database from '../database-communication/database.js';
import User from '../database-communication/user.js'
/* Global Variables for time tracking */
var isPressed;
var sec = 0;
var min = 0;
var hour = 0;
var startTime = 0;
var endTime = 0;


/**
 * Timecard component
 * 
 * Features: 
 *      -Company Logo
 *      -Start/Stop Button for timing shifts
 *      -Daily time text
 */


 class TimeCardStart extends React.Component {

    /**
     * Constructor for the timecard component
     * 
     * @param {} props 
     */
    constructor(props){
        super(props);
        this.state = {
            todayTime: 0,
            lastTimerIn: 0,
            previousTodayDuration: 0,
            currentDuration: 0,
            isTimerOn: false,
            timerUpdater: null,
        };
        this.timerOn = this.timerOn.bind(this);
        this.timerOff = this.timerOff.bind(this);
        this.signOut = this.signOut.bind(this); 
        this.data = new Database();
    };


    /**
     * Updates the users daily time when the stop button is pressed
     * 
     * Takes their current running time and adds it to the daily banked time
     */
    


    /**
     * Turns the timer off
     * 
     * Called when user pressed 'Stop' 
     * Calls totalTime() to total the new time added
     */
    timerOff(){
        let { todayTime, currentDuration, lastTimerIn, timerUpdater,  } = this.state;

      //  todayTime += currentDuration;
        let previousTodayDuration = todayTime;
        currentDuration = 0;
        
        clearInterval(timerUpdater);

        this.setState({ 
            lastTimerIn, todayTime, currentDuration, previousTodayDuration,
            isTimerOn: false,
            timerUpdater: null,
        });

        this.data.punchOut(User.getId());
    }   


    /**
     * Starts the timer 
     * 
     * Called when the user presses 'Start" 
     */

    
    

    timerOn(){

        this.setState({
            isTimerOn: true,
            lastTimerIn: Date.now(),
            timerUpdater: window.setInterval(() => {
                let { currentDuration, lastTimerIn, todayTime, previousTodayDuration } = this.state;
                const actualCurrentDuration = Math.floor((Date.now() - lastTimerIn) / 1000);
                currentDuration++;
                if (actualCurrentDuration > currentDuration + 2) {
                    currentDuration = actualCurrentDuration;
                }
                todayTime = previousTodayDuration + currentDuration;
                this.setState({currentDuration, todayTime});
                
            }, 1000)

        });

        this.data.punchIn(User.getId());
    };


     /**
      * Called when user presses either start or stop
      * 
      * Starts or stopes a timer and updates the state
      */
    onPress = () => { 
        if (this.state.isTimerOn) {
            this.timerOff();
        } else {
            this.timerOn();
        }
    };


    /**
     * Signs user out of App
     * 
     * @author gabes
     */
    signOut = () => {
        console.log(this.props)
        this.props.initialParams.signOutParent();
    }


    /**
     * Renders the start/stop button as well as company logo
     * Also renders a note showing daily time
     * 
     * @returns the timecard component 
     */
     render() {
        const { currentDuration, isTimerOn, todayTime } = this.state;
        const style = isTimerOn ? styles.stop : styles.start
        const text = isTimerOn ? "Clock-Out" : "Clock-In";
        
        /*const d = new Date(todayTime * 1000);
        const hours = d.getUTCHours();
        const minutes = d.getUTCMinutes();
        const seconds = d.getUTCSeconds();
        const timeString = [hours, minutes, seconds].map(value =>  ("0" + value).slice(-2)).join(':');
        */
        const jobList = [
            <Picker.Item label="Java" value="java" />
        ];
        const timeString = TimeUtil.convertMsToReadable(todayTime * 1000);
        let currentJob = "java";
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                <View style={styles.logoutView}>
                    <TouchableOpacity 
                        style={styles.signOutButton}
                        onPress={this.signOut}
                    >
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.current_time}>{currentDuration}</Text>
                    <View style={styles.timerButtonOuter}>
                        <TouchableOpacity 
                            id='timerButton' 
                            style={[styles.button, style]} 
                            onPress={this.onPress}
                            backgroundColor='blue'
                        >
                            <Text style={styles.text}>{text}</Text>
                        </TouchableOpacity> 
                        <View style={[styles.pickerOuter, {
                            flexDirection: "row",
                        }]}>
                            <Text>
                            Current Job:
                            </Text>
                            <View style={[styles.picker, {
                                backgroundColor: "red",
                            }]}>
                                <Picker
                                selectedValue={currentJob}
                         
                                onValueChange={
                                    (choice, index) => this.setChosenJob(choice)
                                }    
                                >
                                    {jobList}
                                    </Picker>
                            </View>
                                
                        </View>
                        
                    </View>
                </View>
                
                 <Text>Today's Time: {timeString}</Text> 
             </View>
            ) 
        }
    }
 

 /**
  * Styles used for creating the timecard component 
  */
 const styles = StyleSheet.create({
     //Timecard container
     container: {
         alignItems: 'center', 
         justifyContent: 'center',
         flex: 0.6,
     },

     //Styles for the logo
     logo: { 
         aspectRatio: 0.7, 
         resizeMode: 'contain',
         marginTop: 100,
     },

     logoutView: {
         flex: 0
     },

     //Styles for start button
     timerButtonOuter: {
         borderRadius: 40,
         borderColor: "#FF0000",
         borderWidth: 5,
         width: 250,
        
         height: 250,
         overflow: 'hidden',
     },

     picker: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        borderRadius: 3,
        borderWidth: 1,
     },
     button: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 35,
        height: 90,
        borderWidth: 5,
        alignItems: 'center',
     },

     signOutButton: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 35,
        height: 90,
        borderWidth: 5,
        alignItems: 'center',
        backgroundColor: 'black'
     },

     signOutText: {
        alignItems: 'center',
        fontSize: 30,
        color: 'white',
        padding: 10,
     },

     start: {
       borderColor: '#138564',
       backgroundColor: 'green',
     },

     //Styles for stop button
     stop: {
        borderColor: '#882244',
        backgroundColor: Color.MAROON, 
    },

    //Styles for text in the button
     text: {
         color: 'white',
         fontSize: 30
     }
 });
 
 export default TimeCardStart;