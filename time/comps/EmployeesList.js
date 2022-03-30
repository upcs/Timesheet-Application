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
import { Color } from './Palette';
import Database from '../database-communication/database.js'
 
 /**
  * List of employees. All data can be edited
  * 
  * @author Jude Gabriel
  */
 class EmployeesList extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            FakeData: [],
            isModalVisible: false,
            userFirst: '',
            userLast: '',
            isAdmin: false,
            userEdited: '',
            stInitialFake: [],
            doOnce: true,
         };
         this.data = new Database();
    }

    sendData = () => {
        
        this.props.parentCallback(this.state.stInitialFake); 
    }

    componentDidMount = () => {
        this.data.getAllAccounts().then((res, rej) => {
            this.setState({FakeData: res}, () => {
            });

            this.setState({stInitialFake : res});
            this.sendData(this.state.stInitialFake);
        });
    }

    updateState = () => {
        this.data.getAllAccounts().then((res, rej) => {
            this.setState({FakeData: res}, () => {
            });

            this.setState({stInitialFake : res});
        });

        //added 
        this.forceUpdate();
    }


    static getDerivedStateFromProps(props, state) {

        if (!props.query) {

            return {
                FakeData : state.stInitialFake,
            };
            
        }

        if (props.data !== state.stInitialFake) {

          return {
            FakeData : props.data 
           
          };
        }     
        return  null;
        
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
        this.data.deleteUserAccount(this.state.userEdited);
        this.updateState();
    }



    updateEmployee = (edited) => {
        this.data.setUserFirst(this.state.userEdited, this.state.userFirst);
        this.data.setuserLast(this.state.userEdited, this.state.userLast);
        this.data.setUserType(this.state.userEdited, this.state.isAdmin);
        this.updateState();
    }


 
     //Render each item as a button
     renderItem = ({item}) => {
        const { isModalVisible } = this.state;
         return (
             <View 
                id='employeeButtonView'
                style={styles.items}>
                 <TouchableOpacity id='employeeButton' onPress={() =>
                 {
                    this.setModalVisible(!isModalVisible);
                    this.setuserFirst(item.firstname);
                    this.setuserLast(item.lastname);
                    this.setUserType(item.admin);
                    this.setUserEdited(item.id);
                 }}>
                     <Text>{item.firstname + " "  + item.lastname}</Text>
                 </TouchableOpacity> 
             </View>
         );
     };
 
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
                                        this.setState({userFirst: text});

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