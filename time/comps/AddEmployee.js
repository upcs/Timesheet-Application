/*******************************************************************
 * Functionality for when the 'Add Employee' button is pressed
 * 
 * Author: Caden Deutscher
 ******************************************************************/
 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Button, Modal, Text, Pressable, StyleSheet, Dimensions, TextInput} from 'react-native'
 import Employees from "./EmployeeInfo";


/**
 * Allows the admin to add an employee
 */
export default function AddEmployee() {
    const [employee, setEmployee] = useState(null);
    const [pass, setPass] = useState(null);
    const [notes, setNotes] = useState(null);
  
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
                <TextInput
                  style={styles.textbox}
                  onChangeText={text => setEmployee(text)}
                  value={employee}
                  placeholder=" Employee Name"
                ></TextInput>
                <TextInput
                    style={styles.textbox}
                    onChangeText={text => setPass(text)}
                    value={pass}
                    placeholder=" Employee Password"
                ></TextInput>
                <TextInput
                    style={styles.textbox}
                    multiline
                    numberOfLines={6}
                    onChangeText={text => setNotes(text)}
                    value={notes}
                    placeholder=" Notes for the worksite"
                >
                </TextInput>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Add Employee</Text>
        </Pressable>
      </View>
    
    );
};

const styles = StyleSheet.create({
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
      alignItems: 'center',
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
      position: 'absolute',
      bottom: '2%'
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textbox: {
      borderColor: 'black',
      width: '100%',
      borderWidth: 2,
      margin: '3%',
      textAlignVertical: 'top',
      padding: '1%'
    },
    blur: {
      width: '100%',
      height: '100%',
      backgroundColor : 'rgba(52, 52, 52, 0.8)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });