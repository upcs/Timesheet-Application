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
        this.state = {
            currValue: ""
        };
        
        

        
    }

      setValue(evt) {
        
        val = evt.target.value;
        this.setState({
            currValue :   evt.target.value
         });
      }

    render() {

        return (

            // Vertical  layout 
            <View>
                <TextInput style={styles.search} placeholder='Search here...' onChange= {evt => this.setValue(evt)} value={this.state.currValue} />
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