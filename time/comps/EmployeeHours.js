/*
Author: caden deutscher
Displays the hours for an employee on a default account
*/
import React, {useEffect, useState} from 'react';
import {Color} from './Palette.js';
import {Text, Divider, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Database from '../database-communication/database.js';
import TimeUtil from './TimeUtil.js';
class EmployeeHours extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            daily: 0,
            weekly: 0,
            id: this.props.dataParentToChild
        };
        this.data = new Database();
    }
    componentDidMount = () => {
        this.data.getDailyTime(this.state.id).then((res, rej) => {
            this.setState({daily: res}, () => {
               // console.log("State mounted");
            });
        });
        this.data.getWeeklyTime(this.state.id).then((res, rej) => {
            this.setState({weekly: res}, () => {
              //  console.log("State mounted");
            });
        });
        
    }

    updateState = () => {
        this.data.getDailyTime(this.state.id).then((res, rej) => {
            this.setState({daily: res}, () => {
               // console.log("State updated");
            });
        });
        this.data.getWeeklyTime(this.state.id).then((res, rej) => {
            this.setState({weekly: res}, () => {
            // console.log("State mounted");
            });
        });
        
    }
   
    render() {
        const daily = TimeUtil.convertMsToReadable(this.state.daily);
        const weekly = TimeUtil.convertMsToReadable(this.state.weekly);
        return (
            //Container for all text
            <View style={styles.container}>
                {/**First hour label (Daily) */}
                <View style={styles.divideText}>
                    <Text adjustsFontSizeToFit={true} style={styles.text2}>Daily Time:</Text>
                </View>
                {/**Hours for the day */}
                <View style={styles.divideResult}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}>{daily}</Text>
                </View>
                {/**First hour label (Week) */}
                <View style={styles.divideText}>
                    <Text adjustsFontSizeToFit={true} style={styles.text2}>Weekly Time:</Text>
                </View>
                {/**Hours for the week */}
                <View style={styles.divideResult}>
                    <Text adjustsFontSizeToFit={true} style={styles.text}>{weekly}</Text>
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