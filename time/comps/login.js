/************************************************
 * Login screen for the application
 * 
 * Outside source used to create button:
 * https://www.youtube.com/watch?v=B1fCdhQs6Eg
 * 
 * Author: Jude Gabriel
 * Date: February 2, 2022
 ************************************************/

import React from 'react';
import { Color } from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'


//Render the Company logo in the center of the screen 
//With a sign-in button underneath
class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />
                <TouchableOpacity style={styles.login} onPress={this.onPress}>
                    <Text style={styles.text}>Sign-in</Text>
                </TouchableOpacity> 
            </View>
        ) 
    }
}

/*  Styles used for login screen */
const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 0.8
    },
    logo: { 
        aspectRatio: 0.9, 
        resizeMode: 'contain'
    },
    login: {
      backgroundColor: Color.MAR, 
      padding: 20, 
      borderRadius: 30,
      width: 200, 
      alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});

export default Login;