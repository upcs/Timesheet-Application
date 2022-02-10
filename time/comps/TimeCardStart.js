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
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 
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
        this.state = {text : 'Start'};
        this.timerOn = this.timerOn.bind(this);
        this.timerOff = this.timerOff.bind(this);
        this.totalTime = this.totalTime.bind(this);
    };


    /**
     * Updates the users daily time when the stop button is pressed
     * 
     * Takes their current running time and adds it to the daily banked time
     */
    totalTime(){
        //Calculate the hours
        let newHour = Math.floor(endTime / 3600000);
        endTime -= newHour * 3600000;
        hour += newHour;

        //Calculate minutes
        let newMin =  Math.floor(endTime / 60000);
        endTime -= newMin * 60000;
        min += newMin;

        //Check if a new hour needs to be rolled over
        if(min >= 60){
            let minRollover = Math.floor(min / 60);
            min -= minRollover * 60;
            hour += minRollover;
        }

        //Calculate new seconds
        let newSec = Math.floor(endTime / 1000);
        endTime = 0;
        sec += newSec;

        //Check if a new minute needs to be rolled over
        if(sec >= 60){
            let secRollover = Math.floor(sec / 60);
            sec -= secRollover * 60;
            min += secRollover;
        }

        //Check again for a new hour rollover after latest minute rollover
        if(min >= 60){
            let minRollover = Math.floor(min / 60);
            min -= minRollover * 60;
            hour += minRollover;
        }
    }


    /**
     * Turns the timer off
     * 
     * Called when user pressed 'Stop' 
     * Calls totalTime() to total the new time added
     */
    timerOff(){
        endTime = Date.now() - startTime;
        this.totalTime();
    }


    /**
     * Starts the timer 
     * 
     * Called when the user presses 'Start" 
     */
    timerOn(){
        startTime = Date.now();
    };


     /**
      * Called when user presses either start or stop
      * 
      * Starts or stopes a timer and updates the state
      */
    onPress = () => { 
        //Check if the user has already pressed the button
        isPressed ? (
            isPressed = false,
            this.setState({text : 'Start'}),
            this.timerOff()
        ) : (
            //Logging 
            isPressed = true,
            this.setState({text : 'Stop'}),
            this.timerOn() 
        );
    };


    /**
     * Renders the start/stop button as well as company logo
     * Also renders a note showing daily time
     * 
     * @returns the timecard component 
     */
     render() {
         const {text} = this.state;
         return (
             <View style={styles.container}>
                 <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                 <TouchableOpacity style={isPressed ? styles.stop : styles.start} 
                 onPress={this.onPress}
                 backgroundColor='blue'>
                     <Text style={styles.text}>{text}</Text>
                 </TouchableOpacity> 
                 <Text>Today's Time: {hour} hours, {min} minutes, {sec} seconds</Text> 
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
         marginTop: 170,
     },

     //Styles for start button
     start: {
       backgroundColor: 'green', 
       padding: 40, 
       borderRadius: 40,
       width: 250, 
       alignItems: 'center',
       marginBottom: 170,
       borderWidth: 5,
       borderColor: '#138564',
     },

     //Styles for stop button
     stop: {
        backgroundColor: Color.MAROON, 
        padding: 40, 
        borderRadius: 40,
        width: 250, 
        alignItems: 'center',
        marginBottom: 170,
        borderWidth: 5,
        borderColor: '#138564',
    },

    //Styles for text in the button
     text: {
         color: 'white',
         fontSize: 40
     }
 });
 
 export default TimeCardStart;