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
 import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal} from 'react-native'
 import FakeData from './FakeJobsiteData';
 import {Color} from './Palette';
 
 
 /**
  * Creates a Scrollable List that can be selected
  * 
  * Data predefined currently (Sprint 1)
  */
class JobsList extends React.Component {
    constructor(props) {
        super(props);
        this.initFakeData = FakeData
        this.state = {
            FakeData: this.initFakeData,
            isModalVisible: false,
            address: '',
            jobName: '',
            jobEdited: 1
        };
    }

    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setAddress = (addy) => {
        this.setState({address: addy})
    }

    setJobName = (aName) => {
        this.setState({jobName: aName})
    }

    setJobEdited = (edited) => {
        this.setState({jobEdited: edited});
        console.log(this.state.jobEdited);
    }


    

 
    //Render each item as a button
    renderItem = ({item}) => {
        const { isModalVisible } = this.state;
        return (
            <View style={styles.items}>
                <TouchableOpacity onPress={ () => {
                    this.setModalVisible(!isModalVisible);
                    this.setAddress(item.address);
                    this.setJobName(item.jobName);
                    this.setJobEdited(item.id);
                }}>
                    <Text >{item.jobName}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList = ({item}) => {
        return(
            <View style={styles.items}>
                <Text>{item.lastName + ", " + item.firstName}</Text>
            </View>
        )
    }
 
    //Create the flatlist
    render() {
        const { isModalVisible } = this.state;
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
                    visible={isModalVisible}
                    onRequestClose= { () => {
                        this.setModalVisible(!isModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            {/* EXIT BUTTON */}
                            <View style={styles.leftView}>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={ () =>
                                {
                                    this.setModalVisible(!isModalVisible);
                                }}>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                            </View>
                             
                            {/* JOB NAME AND ADDRESS*/}
                            <Text style={styles.modalText}>{this.state.jobName}</Text>
                            <Text style={styles.modalText}>{this.state.address}</Text>

                            {/* CHANGE JOB NAME */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>Job Name:</Text>
                                <TextInput 
                                    style={styles.textArea} 
                                    defaultValue={this.state.jobName}
                                    onChangeText={ (text) =>{
                                        this.setState({jobName: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* CHANGE ADDRESS */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>Job Name:</Text>
                                <TextInput 
                                    style={styles.textArea} 
                                    defaultValue={this.state.address}
                                    onChangeText={ (text) =>{
                                        this.setState({address: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* EMPLOYEE LIST */}
                            <FlatList 
                                style={styles.list}
                                data={this.state.FakeData[this.state.jobEdited - 1].employees} 
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderList} 
                            />
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
    leftView: {
        paddingLeft: 0,
        paddingRight: 200,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
    modalText: {
        marginBottom: 15,
        textAlign: "center", 
        fontWeight: 'bold',
        fontSize: 25
    },
    titles: {
        padding: 15
    },
    textAndTitle: {
        flexDirection: 'row'
    },
    textArea: {
        padding: 15,
        marginBottom: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15
    },
    list: {
        flexGrow: 0,
        height: 200
    }
});
 
 
export default JobsList;