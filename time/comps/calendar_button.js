/*****************
 * PLACEHOLDER BUTTON. WILL NOT BE COMPELTED THIS SPRINT
 * 
 */


 import React, { useState }  from 'react';
 import {Color} from './Palette.js';
 import {View, StyleSheet, ButtonGroup} from 'react-native'
 import CalendarS from './calendarSelect';

/**
 * Button that loads calendar on press
 */
 class CalendarButton extends React.Component {
     render() {
         return (
             <View style={styles.container}>
               <CalendarS></CalendarS>
             </View>
         ) 
     }
 }
    
 /*  Styles used for button */
 const styles = StyleSheet.create({
     container: {
        marginLeft: 10,
        flex: 0.8
     },
    button: {
        backgroundColor: Color.MAROON,  
        padding: 10, 
        borderRadius: 10,
        width: 60, 
        alignItems: 'center'
      },
      text: {
        fontSize: 8,

      }
 });
 
 
 export default CalendarButton;