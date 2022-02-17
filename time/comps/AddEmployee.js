/*******************************************************************
 * Functionality for when the 'Add Employee' button is pressed
 * 
 * Author: Caden Deutscher
 ******************************************************************/
 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Modal, Text, Pressable, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity, Alert, Switch} from 'react-native'
 import Employees from "./EmployeeInfo";
import Position from 'react-native/Libraries/Components/Touchable/Position';



/**
 * Allows the admin to add an employee
 */
export default function AddEmployee() {
    const [empF, setEmpF] = useState(null);
    const [empL, setEmpL] = useState(null);
    const [pass, setPass] = useState(null);
    const[isAdmin, setAdmin] = useState(false);
  
    const [modalVisible, setModalVisible] = useState(false);
    //Render the component

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          
          <View style={styles.centeredView}>
            <View style={styles.blur}>
              <View style={styles.modalView}>
                <TouchableOpacity 
                style={styles.exit}
                onPress={ () => {
                  Alert.alert(
                      'Exit Addition',
                      'Are you sure you want to cancel?',
                      [
                          {text: 'Yes', onPress: () => {setEmpF(null), setEmpL(null), setPass(null), setModalVisible(!modalVisible)}, style: 'cancel'
                            
                          },
                          {text: 'No', onPress: () => console.log("Cancel"), style: 'cancel'}
                      ],
                      {cancelable: false}
                  )
              }}
                >
                  <Text style={styles.textStyle}>X</Text>
                </TouchableOpacity>
                <ScrollView style={style.container}>
                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>First Name</Text>
                </View>

                <TextInput
                  style={styles.textbox}
                  onChangeText={text => setEmpF(text)}
                  value={empF}
                  placeholder=" Employee First Name"
                ></TextInput>

                <View style = {styles.textView}>
                  <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Last Name</Text>
                </View>

                <TextInput
                  style={styles.textbox}
                  onChangeText={text => setEmpL(text)}
                  value={empL}
                  placeholder=" Employee Last Name"
                ></TextInput>

                  <View style = {styles.textView}>
                      <Text adjustsFontSizeToFit={true} style = {styles.modalText}>Password</Text>
                  </View>

                <TextInput
                    style={styles.textbox}
                    onChangeText={text => setPass(text)}
                    value={pass}
                    placeholder=" Employee Password"
                ></TextInput>

                <View style = {styles.adEmpView}
                 backgroundColor={isAdmin ? Color.MAROON : "black"}
                 >
                  <Text adjustsFontSizeToFit={true} style = {styles.sText} >{isAdmin ? "Admin" : "Basic"}</Text>
                </View>

                {/* SWITCH FOR CHANGING USER TYPE */}
                <View>
                      <Switch
                       style={styles.switch}
                       trackColor={{false: 'black', true: Color.MAROON}}
                       thumbColor={isAdmin ? "white" : "black"}
                       onValueChange={ () => {
                          setAdmin(!isAdmin);
                       }}
                       value={isAdmin}
                        >
                        </Switch>
                  </View>
    

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text adjustsFontSizeToFit={true} style={styles.textStyle}>Submit</Text>
                </Pressable>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text  style={styles.textStyle}>Add Employee</Text>
        </Pressable>
      </View>
    
    );
};
/*
<TextInput
style={styles.textbox}
multiline
numberOfLines={6}
onChangeText={text => setNotes(text)}
value={notes}
placeholder=" Notes for the worksite"
>
</TextInput>
*/
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