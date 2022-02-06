/*****************
 * PLACEHOLDER BUTTON. WILL NOT BE COMPELTED THIS SPRINT
 * 
 */


 import React from 'react';
 import {Color, style} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
  

/**
 * Button that loads calendar on press
 */
 class CalendarButton extends React.Component {
     render() {
         return (
             <View style={styles.container}>
                 <TouchableOpacity style={styles.button}>
                     <Text style={styles.text}>Date</Text>
                 </TouchableOpacity>
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