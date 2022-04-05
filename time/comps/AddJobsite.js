/*******************************************************************
 * Functionality for when the 'Add Jobsite' button is pressed
 * 
 * Author: Caden Deutscher
 ******************************************************************/
 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Modal, Text, Pressable, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity, Alert, Switch} from 'react-native'
 import Employees from "./EmployeeInfo";
 import Database from '../database-communication/database.js'


/**
 * Allows the admin to add an employee
 */
export default function AddEmployee(props) {
    //create instance of DB
    let data = new Database();

    //Sets for firstname, lastname, password, and if employee is an admin respectively
    const [jobN, setJobN] = useState(null);
    const [jobA, setJobA] = useState(null);
    const[notes, setNotes] = useState(null);
    
    //is modal shown?
    const [modalVisible, setModalVisible] = useState(false);

    //Set employee data
    const[dataOut, setDataOut] = useState( {jName: null, jAd: null,  note: null});

    //Send new employ to parent component
    const handleSubmit = () => {
      //Send mock data to parent
      props.sendData(dataOut);
      //Create the jobsite in the database
      data.createJob(dataOut.jAd,dataOut.jName,dataOut.note);
      //Set all values back to null after submission
      setDataOut({jName: null, jAd: null, note: null});
      setJobA(null);
      setJobN(null);
      setNotes(null);
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
                          {text: 'Yes', id:'yesAlert', onPress: () => {setJobN(null), setJobA(null), setNotes(null), setModalVisible(!modalVisible)}, style: 'cancel'
                            
                          },
                          //On "No" do nothing
                          {text: 'No', id:'noAlert', onPress: () => console.log("Cancel"), style: 'cancel'}
                      ],
                      {cancelable: false}
                  )
              }}
                >
                  <Text adjustsFontSizeToFit={true} style={styles.textStyle}>X</Text>
                </TouchableOpacity>
                {/*Contain everything within a scroll view so it reacts well to the key board*/}
                <ScrollView style={style.container}>

                {/*First text input*/}
                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Job Name</Text>
                </View>

                <TextInput
                  id='jnInput'
                  style={styles.textbox}
                  onChangeText={text => {setJobN(text), setDataOut({jName: text, jAd: jobA,  note: notes})}}
                  value={jobN}
                  placeholder=" Jobsite Name"
                ></TextInput>

                 {/*Second text input*/}
                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Address</Text>
                </View>

                <TextInput
                   id='aInput'
                   multiline
                   numberOfLines={2}
                   style={styles.textbox}
                   onChangeText={text => {setJobA(text),setDataOut({jName: jobN, jAd: text, note: notes})}}
                   value={jobA}
                   placeholder=" Jobsite Address"
                ></TextInput>

                  {/*Third text input*/}
                  <View style = {styles.textView}>
                      <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Notes</Text>
                  </View>
                
                <TextInput
                id='nInput'
                style={styles.textbox}
                multiline
                numberOfLines={6}
                onChangeText={text => {setNotes(text),setDataOut({jName: jobN, jAd: jobA, note: text})}}
                value={notes}
                placeholder=" Notes for the jobsite"
                >
                </TextInput>
                
    

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
          <Text  style={styles.textStyle}>Add Jobsite</Text>
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