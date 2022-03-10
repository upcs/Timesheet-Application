/*******************************************************************
 * Functionality for when the 'Add Employee' button is pressed
 * 
 * Author: Caden Deutscher
 ******************************************************************/
 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Modal, Text, Pressable, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity, Alert, Switch} from 'react-native'
 //import Employees from "./EmployeeInfo";



/**
 * Allows the admin to add an employee
 */
export default function AddEmployee(props) {
    //Sets for firstname, lastname, password, and if employee is an admin respectively
    const [empF, setEmpF] = useState(null);
    const [empL, setEmpL] = useState(null);
    const [pass, setPass] = useState(null);
    const[isAdmin, setAdmin] = useState(0);
    
    //is modal shown?
    const [modalVisible, setModalVisible] = useState(false);

    //Set employee data
    const[dataOut, setDataOut] = useState( {firstname: null, lastname: null, password: null, usertype: isAdmin});

    //Send new employ to parent component
    const handleSubmit = () => {
      props.sendData(dataOut);
      setDataOut({firstname: null, lastname: null, password: null, usertype: isAdmin ? 1 : 0});
      setEmpF(null);
      setEmpL(null);
      setPass(null);
  };
    //Render the component

    return (
      <View style={styles.centeredView}>
        <Modal
          id='theModal'
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          //What to do when back button on phone is pressed
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          
          <View style={styles.centeredView}>
            {/*this View adds the blurred background behind the modal*/}
            <View style={styles.blur}>

              <View style={styles.modalView} id='modalView'>
                <TouchableOpacity 
                id='closeButton'
                style={styles.exit}
                //Make sure user wants to exit when 'x' is pressed
                onPress={ () => {
                  Alert.alert(
                      'Exit Addition',
                      'Are you sure you want to cancel?',
                      [
                        //On "Yes" exit the modal and set all the data to null
                          {text: 'Yes', id:'yesAlert', onPress: () => {setEmpF(null), setEmpL(null), setPass(null), setModalVisible(!modalVisible)}, style: 'cancel'
                            
                          },
                          //On "No" do nothing
                          {text: 'No', id:'noAlert', onPress: () => console.log("Cancel"), style: 'cancel'}
                      ],
                      {cancelable: false}
                  )
              }}
                >
                  <Text style={styles.textStyle}>X</Text>
                </TouchableOpacity>
                {/*Contain everything within a scroll view so it reacts well to the key board*/}
                <ScrollView style={style.container}>

                {/*First text input*/}
                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>First Name</Text>
                </View>

                <TextInput
                  id='fInput'
                  style={styles.textbox}
                  onChangeText={text => {setEmpF(text), setDataOut({firstname: text, lastname: empL, password: pass, usertype: isAdmin ? 1 : 0})}}
                  value={empF}
                  placeholder=" Employee First Name"
                ></TextInput>

                 {/*Second text input*/}
                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Last Name</Text>
                </View>

                <TextInput
                  id='lInput'
                  style={styles.textbox}
                  onChangeText={text => {setEmpL(text),setDataOut({firstname: empF, lastname: text, password: pass, usertype: isAdmin ? 1 : 0})}}
                  value={empL}
                  placeholder=" Employee Last Name"
                ></TextInput>

                   {/*Third text input*/}
                  <View style = {styles.textView}>
                      <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Password</Text>
                  </View>

                <TextInput
                    id='pInput'
                    style={styles.textbox}
                    onChangeText={text => {setPass(text),setDataOut({firstname: empF, lastname: empL, password: text, usertype: isAdmin ? 1 : 0})}}
                    value={pass}
                    placeholder=" Employee Password"
                ></TextInput>

                {/*Switch*/}
                {/*Switch background color and text when switch is fliped*/}
                <View style = {styles.adEmpView}
                 backgroundColor={isAdmin ? Color.MAROON : "black"}
                 >
                  <Text adjustsFontSizeToFit={true} style = {styles.sText} >{isAdmin ? "Admin" : "Basic"}</Text>
                </View>

                {/* SWITCH FOR CHANGING USER TYPE */}
                <View>
                      <Switch
                       id='aSwitch'
                       style={styles.switch}
                       trackColor={{false: 'black', true: Color.MAROON}}
                       thumbColor={isAdmin ? "white" : "black"}
                       onValueChange={ () => {
                          setAdmin(!isAdmin);
                          setDataOut({firstname: empF, lastname: empL, password: pass, usertype: isAdmin ? 0 : 1 });
                       }}
                       value={isAdmin}
                        >
                        </Switch>
                  </View>
    

                <Pressable
                  id='submitButton'
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { handleSubmit(),setModalVisible(!modalVisible)}}>
                  <Text adjustsFontSizeToFit={true} style={styles.textStyle}>Submit</Text>
                </Pressable>

                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable id='addButton' style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text  style={styles.textStyle}>Add Employee</Text>
        </Pressable>
      </View>
    
    );
};


const styles = StyleSheet.create({
    exit:{
      backgroundColor: Color.MAROON,
      alignContent: 'center',
      width: '15%',
      borderRadius: 10,
      marginBottom: '10%'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '90%',
      height: '80%',
      backgroundColor: 'white',
      padding: '10%',
      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: '8%',
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: Color.MAROON,
    },
    buttonClose: {
      backgroundColor: Color.MAROON,
      padding: '3%',
      margin: '3%',
      bottom: '2%'
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textbox: {
      flex: 1,
      borderColor: 'black',
      width: '95%',
      borderWidth: 2,
      margin: '3%',
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      padding: '1%'
    },
    blur: {
      width: '100%',
      height: '100%',
      backgroundColor : 'rgba(52, 52, 52, 0.8)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalText: {
      textAlign: 'center',
      color: 'white'
    },
    textView: {
      backgroundColor: Color.MAROON,
      width: '70%',
      alignSelf: 'center'

    },
    container: {
        width: '100%',
        height: '100%'
    },
    switch:{
      alignSelf: 'center',
      marginBottom: '10%'
  },
  sText: {
    alignSelf: 'center',
    color: 'white'
  },
  adEmpView: {
    width: '30%',
    height: '8%',
    alignSelf: 'center',
    justifyContent: 'center'
  }
  });