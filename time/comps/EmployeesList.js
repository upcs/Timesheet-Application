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
 import { Text, View, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, Alert, Switch} from 'react-native'
 import FakeData from './FakeData';
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



    updateEmployee = (edited) => {
        console.log(this.state.FakeData);
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
                 <TouchableOpacity onPress={() =>
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
                    data={this.state.FakeData} 
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem} 
                    />
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible = {isModalVisible}
                    onRequestClose = { () => {
                        Alert.alert("modal has been closed");
                        this.setModalVisible(!isModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            {/* THE EXIT BUTTON */}
                            <View style={styles.leftView}>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={ () =>
                                {
                                    this.setModalVisible(!isModalVisible);
                                }}>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                            </View>

                            {/* USER'S NAME */}
                            <Text style={styles.modalText}> {this.state.userFirst + " " + this.state.userLast}</Text>

                            {/* CHANGE FIRST NAME */}
                            <TextInput 
                                style={styles.textArea} 
                                defaultValue={this.state.userFirst}
                                onChangeText={ (text) =>{
                                    this.setState({userFirst: text})
                                }}>
                            </TextInput>

                            {/* CHANGE LAST NAME */}
                            <TextInput 
                                style={styles.textArea} 
                                defaultValue={this.state.userLast}
                                onChangeText={ (text) =>{
                                    this.setState({userLast: text})
                                }}>
                            </TextInput>

                            {/* SWITCH FOR CHANGING USER TYPE */}
                            <Switch
                            style={styles.switch}
                            trackColor={{false: 'black', true: Color.MAROON}}
                            thumbColor={isAdmin ? "white" : "black"}
                            onValueChange={ () => {
                                this.setAdmin(!isAdmin);
                            }}
                            value={isAdmin}
                            >
                            </Switch>
                            
                            {/* SAVE CHANGES */}
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.updateEmployee(this.state.userEdited);
                                    }}>
                                    <Text style={styles.textStyle}>Save Changes</Text>
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
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: Color.MAROON,
      },
      buttonClose: {
        backgroundColor: Color.MAROON
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      textArea: {
          padding: 15,
          marginBottom: 15,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 15
      },
      switch:{
          paddingBottom: 50
      }

 });
 
 
 export default EmployeesList;