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
import { Color } from './Palette';
import Database from '../database-communication/database.js'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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
           stInitialFake: [],
           doOnce: true,
           currentEmp: ''
        };
        this.data = new Database();

    }

    componentDidMount = () => {
        this.data.getAllAccounts().then((res, rej) => {
            this.setState({data: res}, () => {
            });

            this.setState({stInitialFake : res});
            this.sendData(this.state.stInitialFake);
        });
    }

    sendData = () => {
        
        this.props.parentCallback(this.state.stInitialFake); 
    }

    setEmployee = (id) => {
        this.props.onChange(id);
        this.state.currentEmp = id;
    }




    //Render each item as a button
    renderItem = ({item}) => {
        let theColor = Color.MAROON;
        if(this.state.currentEmp == item.id){
            theColor = 'black';
        }
        return (
            <View style={styles.item}>
                <TouchableOpacity  onPress={() => {
                    this.setEmployee(item.id);
                    
                }}>
                    <Text style={[{color: theColor},styles.empStyle]}>{item.firstname + " " + item.lastname}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    static getDerivedStateFromProps(props, state) {

        if (!props.query) {
            return {
                data : state.stInitialFake,
            };
            
        }

        if (props.data !== state.stInitialFake) {
          return {
            data : props.data 
           
          };
        }     
        return  null;
        
    }

    //Create the flatlist
    render() {

        //Send data when prop "request" is true
        if (this.state.doOnce == true) {
            this.data.getAllAccounts().then((res, rej) => {
                this.setState({stInitialFake : res});
                this.sendData(this.state.stInitialFake);
            });

            this.setState({doOnce : false});
        }


        if (this.props.request) {
                      
            this.sendData();
        }


        return (
            <View>
                <FlatList 
                    data={this.state.data} 
                    renderItem={this.renderItem} 
                    keyExtractor={item => item.name}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        );
    }
}


//Styles used for Scrollable list
const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderTopWidth: 2,
        backgroundColor: 'white',
        borderColor: 'black'
    }, 
    contentContainer: {
        paddingBottom: 100
      },
      empStyle: {
          fontWeight: 'bold',
         
      }
});


export default TimeSheetList;