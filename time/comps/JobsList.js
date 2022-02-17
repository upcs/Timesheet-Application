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
 import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Alert, TouchableHighlightBase} from 'react-native'
 import FakeData from './FakeJobsiteData';
 import {Color} from './Palette';
 import eData from './FakeEmployeeData'
 
 
 /**
  * Creates a Scrollable List that can be selected
  * 
  * Data predefined currently (Sprint 1)
  */
class JobsList extends React.Component {
    constructor(props) {
        super(props);
        this.initFakeData = FakeData;
        this.initEData = eData;
        this.state = {
            FakeData: this.initFakeData,
            eData: this.initEData,
            isModalVisible: false,
            modalTwo: false,
            address: '',
            jobName: '',
            jobEdited: 1,
            employeeEdited: 1,
            eList: this.initFakeData[1]
        };
    }

    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setModalTwo = (visible) => {
        this.setState({modalTwo: visible});
    }

    setAddress = (addy) => {
        this.setState({address: addy})
    }

    setJobName = (aName) => {
        this.setState({jobName: aName})
    }

    setJobEdited = (edited) => {
        this.setState({jobEdited: edited});
    }

    setEmployeeEdited = (edited) => {
        this.setState({employeeEdited: edited});
    }

    setEList = (list) => {
        this.setState({elist: list});
        console.log(this.state.eList)
    }

    deleteUser = () => {
        //console.log(this.state.eList);
        
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
                    this.setEList(item.employees);
                }}>
                    <Text >{item.jobName}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    //Render each employee
    renderEmployee = ({item}) => {
        const { modalTwo } = this.state;
        return (
            <View style={styles.items}>
                <TouchableOpacity onPress={ () => {
                    Alert.alert(
                        'Add Employee',
                        'Add Employee to Jobsite',
                        [
                            {text: 'Yes', onPress: () =>{
                                    //this.deleteUser();
                                    //this.setModalVisible(!isModalVisible);
                                }, 
                            },
                            {text: 'No', onPress: () => console.log("Cancel"), style: 'cancel'}
                        ],
                        {cancelable: false}
                    )
                }}>
                    <Text >{item.lastName + ", " + item.firstName}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList = ({item}) => {
        return(
            <View style={styles.items}>
                <TouchableOpacity onPress={ () => {
                    this.setEmployeeEdited(item.id);
                    Alert.alert(
                        'Remove User',
                        'Remove User from Job?',
                        [
                            {text: 'Yes', onPress: () => {
                                this.deleteUser();
                                }
                            },
                            {text: 'No'}
                        ]
                    )
                }}>
                    <Text>{item.lastName + ", " + item.firstName}</Text>   
                </TouchableOpacity>
            </View>
        )
    }
 
    //Create the flatlist
    render() {
        const { isModalVisible } = this.state;
        const { modalTwo } = this.state;
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

                            {/* SAVE CHANGES */}
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.updateEmployee(this.state.userEdited);
                                    }}>
                                    <Text style={styles.textStyle}>Save Changes</Text>
                            </TouchableOpacity>

                            {/* ADD EMPLOYEE */}
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.setModalTwo(!modalTwo);
                                    }}>
                                    <Text style={styles.textStyle}>Add Employee</Text>
                            </TouchableOpacity>

                            {/* REMOVE JOB */}
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        Alert.alert(
                                            'Delete user',
                                            'Would you like to delete this user?',
                                            [
                                                {text: 'Yes', onPress: () =>{
                                                        //this.deleteJob();
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

                {/* Add Employee Modal */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalTwo}
                    onRequestClose= { () => {
                        this.setModalVisible(!modalTwo);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            {/* EXIT BUTTON */}
                            <View style={styles.leftView}>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={ () =>
                                {
                                    this.setModalTwo(!modalTwo);
                                    this.setModalVisible(!isModalVisible);
                                }}>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Search Employees */}
                            <Text style={styles.modalText}>Search Employees</Text>
                            <FlatList 
                                data={this.state.eData} 
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderEmployee} 
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
        marginTop: 10
    },
    modalView: {
        margin: 20,
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
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
 
 
export default JobsList;