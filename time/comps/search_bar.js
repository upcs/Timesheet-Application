

/****************************************
 * Creates a search bar component
 * 
 * Author: Jude Gabriel
 * Date: February 2, 2022
 * 
 * Outside Source for learning textinputs:
 * https://reactnative.dev/docs/textinput
 */
 import React, {useEffect, useState} from 'react';
 //import {Color, style} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image, Button, TextInput} from 'react-native'
 
 
 
 
 //Render the Company logo in the center of the screen 
 //With a sign-in button underneath
 class SearchBar extends React.Component {
 
     constructor(props) {
         super(props);
         this.currValue = this.currValue.bind(this); 
         this.state = {
             value: ""
         }
 
         
     }
 
     currValue(text) {
         
         //val = evt.target.value;
         //console.log(text);
         this.setState({value: text})
         this.props.currValue(text);
     }
 
     render() {
 
         return (
 
             // Vertical  layout 
             <View>
                 <TextInput style={styles.search} placeholder='Search here...' onChangeText= {this.currValue} value = {this.state.value}  />
             </View>
         
         
         
         );
     }
 
 
    
 }
 
 
 const styles = StyleSheet.create({
     search: {
         width: 150,
         borderColor: 'black',
         borderWidth: 2,
         borderRadius: 15,
         padding: 10
     }
 }); 
 export default SearchBar;