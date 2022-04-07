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
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal, TextInput, Pressable} from 'react-native'
import { Color } from './Palette.js';
import Database from '../database-communication/database.js'

/**
 * Creates a Scrollable List that can be selected
 * 
 * Data predefined currently (Sprint 1)
 */
class TimeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //display the hours
            isModalVisible: false,
           data: this.props.hoursData,
           currentTime: 0,
           currentDate: 0,
           empID: this.props.emp
         
        };
        this.data = new Database();
    }

   dataChange = () => {
       this.setState({data: this.props.hoursData});
   }
   setModalVisible = (visible) => {
    this.setState({isModalVisible: visible});
}
setCurrentTime = (time) => {
    this.setState({currentTime: time});
}

    //Render each item as a button
    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                  this.setModalVisible(true);
                  this.setCurrentTime(item.hours);
                }}>
                    <Text >{item.date + '\n' + item.hours}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    //Create the flatlist
    render() {

        return (
            <View>
                  <Modal
                    id='employeeModal'
                    animationType='slide'
                    transparent={true}
                    visible = {this.state.isModalVisible}
                    onRequestClose = { () => {
                        this.setModalVisible(!this.state.isModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        {/*this View adds the blurred background behind the modal*/}
                        <View style={styles.blur}>
                            <View style={styles.modalView} id='modalView'>
                                <TouchableOpacity 
                                    id='closeButton'
                                    style={styles.exit}
                                    //Make sure user wants to exit when 'x' is pressed
                                    onPress={ () => {
                                        this.setModalVisible(!this.state.isModalVisible)}}
                                    >
                                    <Text adjustsFontSizeToFit={true} style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                                  {/*First text input*/}
                                    <View style = {styles.textView}>
                                    <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Punch Time (Min)</Text>
                                    </View>

                                    <TextInput
                                    id='punchTime'
                                    style={styles.textbox}
                                    onChangeText={text => {this.setCurrentTime(text)}}
                                    value={this.state.currentTime.toString()}
                                    
                                    ></TextInput>
                                     <Pressable
                                    id='submitButton'
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {this.setModalVisible(!this.state.isModalVisible)}}>
                                    <Text adjustsFontSizeToFit={true} style={styles.textStyle}>Submit</Text>
                                    </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList 
                    data={this.state.data} 
                    renderItem={this.renderItem} 
                    keyExtractor={item => item.id}/>
            </View>
        );
    }
}


//Styles used for Scrollable list
const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderTopWidth: 1,
    },
    blur: {
        width: '100%',
        height: '100%',
        backgroundColor : 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        width: '90%',
        height: '30%',
        backgroundColor: 'white',
        padding: '10%',
        shadowColor: '#000',
        alignContent: 'center',
        justifyContent: 'center',
  
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      exit:{
        backgroundColor: Color.MAROON,
        alignContent: 'center',
        alignSelf:'flex-start',
        width: '15%',
        borderRadius: 10,
        marginBottom: '2%'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      textbox: {
          flex:0.5,
         borderColor: 'black',
        width: '95%',
        borderWidth: 2,
        marginTop: '3%',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        alignSelf: 'center',
        padding: '2%'
      },
      textView: {
        flex: 0.4,
        backgroundColor: Color.MAROON,
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
      },
      button: {
        borderRadius: 20,
        padding: '8%',
        marginTop: '3%',
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: Color.MAROON,
        padding: '3%',
        margin: '3%',
        bottom: '2%'
      },
      modalText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
      },

});


export default TimeList;