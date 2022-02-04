/******************************************
 * Component for the admin timesheet
 * 
 * Author: Jude Gabriel
 * Date: February 2. 2022
 *****************************************/


import React, {useEffect, useState} from 'react';
//import {Color, style} from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import SearchBar from './search_bar'
import ScrollableList from './scrollable_list';
import Menu from './Menu';
import { textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';




//Render the Company logo in the center of the screen 
//With a sign-in button underneath
class AdminTimesheet extends React.Component {
    render() {
        return (


            // Vertical  layout 
            <View style={styles.vertical_layout}>
                <Menu></Menu>
                 {/* Horizontal Layout for serch and date selection */}
                <View style={styles.horizontal_layout_top}>
                    <SearchBar></SearchBar>
                    <Text> Search From: <Button title='Date'/> To: <Button title='Date'/>
                    </Text>
                </View>

                {/* Horizontal Layout for employees and Hours  */}
                <View style={styles.horizontal_layout_bottom}>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={styles.employees_hours}>Employee</Text>
                        <ScrollableList style={styles.employees}></ScrollableList>
                    </View>
                    <View style={[styles.vertical_layout, styles.employees_hours]}>
                        <Text style={styles.employees_hours}>Hours</Text>
                        <ScrollableList style={styles.employees}></ScrollableList>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    vertical_layout: {
        marginTop: 40,
        flex: 1,
        backgroundColor: 'blue'
    },
    horizontal_layout_top: {
        flex: 0.1,
        flexDirection: "row", 
        marginBottom: 0,
        backgroundColor: 'yellow',
        marginTop: 5
    },
    horizontal_layout_bottom: {
        flex: 1,
        flexDirection: "row", 
        marginBottom: 0,
        backgroundColor: 'blue'
    },
    search: {
        marginRight: 75,
        marginLeft: 20
    },
    employees_hours: {
        marginLeft: 0,
        fontSize: 35,
        backgroundColor: 'red',
        marginTop: 0,
        padding: 0,
        borderLeftWidth: 1
    },
});


export default AdminTimesheet;