/*
Author: caden deutscher
Displays the hours for an employee on a default account
*/
import React from 'react';
import {Color} from './Palette.js';
import {Text, Divider, View, StyleSheet, TouchableOpacity, Image} from 'react-native'

class EmployeeHours extends React.Component {
    render() {
        return (
            //Container for all text
            <View style={styles.container}>
                {/**First hour label (Daily) */}
                <View style={styles.divideText}>
                    <Text adjustsFontSizeToFit={true} style={styles.text2}>Daily Hours:</Text>
                </View>
                {/**Hours for the day */}
                <View style={styles.divideResult}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}>5 hours</Text>
                </View>
                {/**First hour label (Week) */}
                <View style={styles.divideText}>
                    <Text adjustsFontSizeToFit={true} style={styles.text2}>Weekly Hours:</Text>
                </View>
                {/**Hours for the week */}
                <View style={styles.divideResult}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}>35 hours</Text>
                </View>
            </View>
        ) 
    }
}

/* Create styles for employee hours */
const styles = StyleSheet.create({
    //Main container
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
    },
    //Hours Text
    text: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 30
    },
    //Hours label Text
    text2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 35
    },
    //View for labels
    divideText: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: Color.MAROON,
        width: '100%',
        height: '10%',
        flex:0.12
    },
    //View for actual hours
    divideResult: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '10%',
        flex:0.2
    }
});

export default EmployeeHours;