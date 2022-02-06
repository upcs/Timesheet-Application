/************************************************
 * Time Card Start Menu
 * 
 * Author: Harrison Winters (Build off of Jude Gabriel's Login component)
 * Date: February 5, 2022
 ************************************************/

 import React from 'react';
 import {Color} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 
 
 //Company Logo with large "Start" button in the center of the screen
 
 class TimeCardStart extends React.Component {
     render() {
         return (
             <View style={styles.container}>
                 <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                 <TouchableOpacity style={styles.start} onPress={this.onPress}>
                     <Text style={styles.text}>Start</Text>
                 </TouchableOpacity> 
             </View>
         ) 
     }
 }
 
 /*  Styling*/
 const styles = StyleSheet.create({
     container: {
         alignItems: 'center', 
         justifyContent: 'center',
         flex: 0.6,
     },
     logo: { 
         aspectRatio: 0.7, 
         resizeMode: 'contain',
         marginTop: 170,
     },
     start: {
       backgroundColor: Color.MAROON, 
       padding: 40, 
       borderRadius: 40,
       width: 250, 
       alignItems: 'center',
       marginBottom: 170,
       borderWidth: 5,
       borderColor: '#138564',

     },
     text: {
         color: 'white',
         fontSize: 40
     }
 });
 
 export default TimeCardStart;