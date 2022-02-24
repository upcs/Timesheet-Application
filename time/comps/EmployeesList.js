/********************************************************************
 * Scrollable list component
 * 
 * Author: Jude Gabriel
 * Date: February 2, 2022
 * 
 * Sources: 
 * Touchable List: https://reactnative.dev/docs/flatlist
 * Constructor for list: https://www.tutorialspoint.com/what-is-the-flatlist-component-and-how-to-use-it-in-react-native
 * 
 * Delete: https://reactnative-examples.com/remove-selected-item-from-flatlist-in-react-native/
 ***********************************************************************/
 

import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, Alert, Switch} from 'react-native'
import FakeData from './FakeEmployeeData';
import { Color } from './Palette';
 
 
 /**
  * Creates a Scrollable List that can be selected
  * 
  * Data predefined currently (Sprint 1)
  */
 class EmployeesList extends React.Component {
     constructor(props) {
         super(props);
         this.initFakeData = FakeData
         this.state = {
            FakeData: this.initFakeData,
            isModalVisible: false,
            userFirst: '',
            userLast: '',
            isAdmin: false,
            userEdited: 0
         };
    }

    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setAdmin = (admin) => {
        this.setState({isAdmin: admin})
    }

    setuserFirst = (username) => {
        this.setState({userFirst: username});
    }

    setuserLast = (username) => {
        this.setState({userLast: username});
    }

    setUserType = (usersType) => {
        if(usersType == 1){
            this.setState({isAdmin: true});
        }
        else{
            this.setState({isAdmin: false})
        }
    }

    setUserEdited = (edited) => {
        this.setState({userEdited: edited})
    }

    deleteUser = () => {
        const newEmployeeList = this.state.FakeData.filter(item => item.id !== this.state.userEdited)
        this.setState({FakeData: newEmployeeList});
    }



    updateEmployee = (edited) => {
        const newEmployeeList = this.state.FakeData.map( item =>
            {
                if (item.id === edited){
                    item.firstName = this.state.userFirst;
                    item.lastName = this.state.userLast;
                    if(this.state.isAdmin){
                        item.userType = 1;
                    }
                    else{
                        item.userType = 0;
                    }
                    return item;
                }
                return item;
            })
            this.setState({FakeData: newEmployeeList});
    }


 
     //Render each item as a button
     renderItem = ({item}) => {
        const { isModalVisible } = this.state;
         return (
             <View style={styles.items}>
                 <TouchableOpacity id='employeeButton' onPress={() =>
                 {
                    this.setModalVisible(!isModalVisible);
                    this.setuserFirst(item.firstName);
                    this.setuserLast(item.lastName);
                    this.setUserType(item.userType);
                    this.setUserEdited(item.id);
                 }}>
                     <Text>{item.firstName + " "  + item.lastName}</Text>
                 </TouchableOpacity>
             </View>
         );
     };
 
     //Create the flatlist 
     render() {
        const { isModalVisible } = this.state;
        const {isAdmin} = this.state;
        return (
            <View> 
                <FlatList 
                    id='list'
                    data={this.state.FakeData} 
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem} 
                    />
                <Modal
                    id='employeeModal'
                    animationType='slide'
                    transparent={true}
                    visible = {isModalVisible}
                    onRequestClose = { () => {
                        this.setModalVisible(!isModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            {/* THE EXIT BUTTON */}
                            <View style={styles.leftView}>
                                <TouchableOpacity 
                                id='exitButton' 
                                style={[styles.button, styles.buttonClose]} 
                                onPress={ () =>
                                {
                                    this.setModalVisible(!isModalVisible);
                                }}>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                            </View>

                            {/* USER'S NAME */}
                            <Text style={styles.modalText}> 
                                {this.state.userFirst + " " + this.state.userLast}
                            </Text>

                            {/* CHANGE FIRST NAME */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>First Name:</Text>
                                <TextInput 
                                    id='firstName'
                                    style={styles.textArea} 
                                    defaultValue={this.state.userFirst}
                                    onChangeText={ (text) =>{
                                        this.setState({userFirst: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* CHANGE LAST NAME */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>Last Name:</Text>
                                <TextInput 
                                    id='lastName'
                                    style={styles.textArea} 
                                    defaultValue={this.state.userLast}
                                    onChangeText={ (text) =>{
                                        this.setState({userLast: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* SWITCH FOR CHANGING USER TYPE */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>Basic</Text>
                                <Switch
                                    id='adminSwitch'
                                    style={styles.switch}
                                    trackColor={{false: 'black', true: Color.MAROON}}
                                    thumbColor={isAdmin ? "white" : "black"}
                                    onValueChange={ () => {
                                        this.setAdmin(!isAdmin);
                                    }}
                                    value={isAdmin}
                                >
                                </Switch>
                                <Text style={styles.titles}>Admin</Text>
                            </View>
                            
                            {/* SAVE CHANGES */}
                            <TouchableOpacity
                                id='saveChanges'
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.updateEmployee(this.state.userEdited);
                                    }}>
                                    <Text style={styles.textStyle}>Save Changes</Text>
                            </TouchableOpacity>
                            
                            {/* REMOVE USER */}
                            <TouchableOpacity
                                id='removeUser'
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        Alert.alert(
                                            'Delete user',
                                            'Would you like to delete this user?',
                                            [
                                                {text: 'Yes', onPress: () =>{
                                                        this.deleteUser();
                                                        this.setModalVisible(!isModalVisible);
                                                    }, 
                                                },
                                                {text: 'No', onPress: () => console.log("Cancel"), style: 'cancel'}
                                            ],
                                            {cancelable: false}
                                        )
                                    }}>
                                    <Text style={styles.textStyle}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
     }
 }
 
 
 //Styles used for Scrollable list
 const styles = StyleSheet.create({
    items: {
        padding: 20,
        borderTopWidth: 1,
    }, 
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    leftView: {
        paddingLeft: 0,
        paddingRight: 200,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start'
      },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 55,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        marginTop: 25
        },
        buttonOpen: {
        backgroundColor: Color.MAROON,
    },
    buttonClose: {
        backgroundColor: Color.MAROON,
    },
    textAndTitle: {
        flexDirection: 'row'
    },
    titles: {
        padding: 15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center", 
        fontWeight: 'bold',
        fontSize: 25
    },
    textArea: {
        padding: 15,
        marginBottom: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15
    },
    switch:{
        padding: 15,
        marginTop: 10,
        marginBottom: 30
    },
 });
 
 
 export default EmployeesList;