/********************************************************************
 * Scrollable list component
 * 
 * Author: Jude Gabriel
 * Date: February 2, 2022
 * 
 * Sources: 
 * Touchable List: https://reactnative.dev/docs/flatlist
 * Constructor for list: https://www.tutorialspoint.com/what-is-the-flatlist-component-and-how-to-use-it-in-react-native
 ***********************************************************************/
 

import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Database from '../database-communication/database.js'

/**
 * Creates a Scrollable List that can be selected
 * 
 * Data predefined currently (Sprint 1)
 */
class TimeSheetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Prepopulate with fake data
           data: [],
        };
        this.data = new Database();
    }

    componentDidMount = () => {
        this.data.getAllAccounts().then((res, rej) => {
            this.setState({data: res}, () => {
            });
        });
    }

    setEmployee = (id) => {
        this.props.onChange(id);
    }




    //Render each item as a button
    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    this.setEmployee(item.id);
                }}>
                    <Text >{item.firstname + " " + item.lastname}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    //Create the flatlist
    render() {
        return (
            <View>
                <FlatList 
                    data={this.state.data} 
                    renderItem={this.renderItem} 
                    keyExtractor={item => item.name}/>
            </View>
        );
    }
}


//Styles used for Scrollable list
const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderTopWidth: 1,
    }
});


export default TimeSheetList;