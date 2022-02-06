/************************************************
 * TextInput for Search Bar
 * 
 * Source: https://reactnative.dev/docs/textinput
 * 
 * Author: Harrison Winters
 * Date: February 5, 2022
 ************************************************/

 import React from 'react';
 import {Color} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 import { useState } from 'react';
import { TextInput } from 'react-native';


 const SearchBar = () => {
  const [text, onChangeText] = React.useState("Search");
  const [number, onChangeNumber] = React.useState(null);
  
    return (
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 170,
      margin: 12,
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
    },
  });
  
 
 export default SearchBar;