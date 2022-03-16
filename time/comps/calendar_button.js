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
               <View style ={styles.container2}>
                  <CalendarS id="From" name="From"></CalendarS>
               </View>
               <View style ={styles.container2}>
                  <CalendarS id="To" name="   To   "></CalendarS>
               </View>
             </View>
         ) 
     }
 }
    
 /*  Styles used for button */
 const styles = StyleSheet.create({
     container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: "row",
        flex: 1
     },
     container2: {
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: "row",
      flex: 1
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