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
 import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Alert} from 'react-native'
 import FakeData from './FakeJobsiteData';
 import {Color} from './Palette';
 import eData from './FakeEmployeeData';
 import SearchBar from './search_bar';
 import Database from '../database-communication/database.js'
 
 
 /**
  * Creates a Scrollable List that can be selected
  * 
  * Data predefined currently (Sprint 1)
  */
class JobsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FakeData: [],
            eData: [],
            isModalVisible: false,
            modalTwo: false,
            address: '',
            jobName: '',
            jobEdited: '',
            employeeEdited: '',
            eList: null
        };

        this.data = new Database()
    }

    componentDidMount = () => {
        this.data.getAllJobs().then((res, rej) => {
            this.setState({FakeData: res}, () => {
            });
        });
    }

    updateState = () => {
        this.data.getAllJobs().then((res, rej) => {
            this.setState({FakeData: res}, () => {
            });
        });
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

    setEList = (id) => {
        this.data.getJobEmployeesID(id).then((res, rej) => {
            this.data.getAllAccounts().then((accResponse, accRej) => {
                this.setState({eData:this.data.getEmployeesNotOnJob(accResponse, res)});
            })
            this.data.getJobEmployeeData(res).then((respo, rejo) => {
                this.setState({eList: respo});
            })
        });
    }

    deleteJob = () => {
        const newJobList = this.state.FakeData.filter(item => item.id !== this.state.jobEdited)
        this.setState({FakeData: newJobList});
    }

    saveJob = (edited) => {
        this.data.setJobName(this.state.jobEdited, this.state.jobName);
        this.data.setJobAddress(this.state.jobEdited, this.state.address);
        this.updateState();
    }

    deleteUser = () => {
        this.data.getJobEmployeesID(this.state.jobEdited).then((res, rej) => {
            for(var i = 0; i < res.length; i++){
                if(res[i].accountID == this.state.employeeEdited){
                    this.data.removeEmployeeFromJob(this.state.jobEdited, res[i].id);
                    this.setEList(this.state.jobEdited);
                }
            }
        });
    }
 
    addUser = (item) => {
        this.data.addEmployeeToJob(this.state.jobEdited, item);
        this.setEList(this.state.jobEdited);
    }

 
    //Render each item as a button
    renderItem = ({item}) => {
        const { isModalVisible } = this.state;
        return (
            <View 
                id='jobsView'
                style={styles.items}>
                <TouchableOpacity 
                    id='jobListButton'
                    onPress={ () => {
                        this.setModalVisible(!isModalVisible);
                        this.setAddress(item.address);
                        this.setJobName(item.name);
                        this.setJobEdited(item.id); 
                        this.setEList(item.id);
                    }
                }>
                    <Text >{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    //Render each employee
    renderEmployee = ({item}) => {
        const { modalTwo } = this.state;
        const { isModalVisible } = this.state;
        return (
            <View 
                id='employeeAddView'
                style={styles.items}>
                <TouchableOpacity 
                    id='employeeToAdd'
                    onPress={ () => {
                    Alert.alert(
                        'Add Employee',
                        'Add Employee to Jobsite',
                        [
                            {text: 'Yes', onPress: () =>{
                                    Alert.alert(
                                        'Employee Added', 
                                        'Employee Added to Jobsite',
                                        this.addUser(item),
                                        this.setModalTwo(!modalTwo),
                                        this.setModalVisible(!isModalVisible)
                                    )
                                }, 
                            },
                            {text: 'No', style: 'cancel'}
                        ],
                        {cancelable: false}
                    )
                }}>
                    <Text >{item.lastname + ", " + item.firstname}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    //Render sublist of employees for each job
    renderList = ({item}) => {
        return(
            <View 
                id='employeeJobView'
                style={styles.items}>
                <TouchableOpacity 
                    id='employeeInJob'
                    onPress={ () => {
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
                    <Text>{item.lastname + ", " + item.firstname}</Text>   
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
                    id='jobsList'
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
                                <TouchableOpacity id='jobModalExit' 
                                style={[styles.button, styles.buttonClose]} 
                                onPress={ () =>
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
                                    id='jobName'
                                    style={styles.textArea} 
                                    defaultValue={this.state.jobName}
                                    onChangeText={ (text) =>{
                                        this.setState({jobName: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* CHANGE ADDRESS */}
                            <View style={styles.textAndTitle}>
                                <Text style={styles.titles}>Job Address:</Text>
                                <TextInput 
                                    id='jobAddress'
                                    style={styles.textArea} 
                                    defaultValue={this.state.address}
                                    onChangeText={ (text) =>{
                                        this.setState({address: text})
                                    }}>
                                </TextInput>
                            </View>

                            {/* SEARCH BAR */}
                            <View styles={styles.search}>
                                <SearchBar></SearchBar>
                            </View>

                            {/* EMPLOYEE LIST */}
                            <FlatList 
                                id='employeeJobList'
                                style={styles.list}
                                data={this.state.eList}  
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderList} 
                            />

                            {/* SAVE CHANGES */}
                            <TouchableOpacity
                                id='saveJobChanges'
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.saveJob(this.state.jobEdited);
                                    }}>
                                    <Text style={styles.textStyle}>Save Changes</Text>
                            </TouchableOpacity>

                            {/* ADD EMPLOYEE */}
                            <TouchableOpacity
                                id='addEmployeeButton'
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        this.setModalVisible(!isModalVisible);
                                        this.setModalTwo(!modalTwo);
                                    }}>
                                    <Text style={styles.textStyle}>Add Employee</Text>
                            </TouchableOpacity>

                            {/* REMOVE JOB */}
                            <TouchableOpacity
                                id='removeJobButton'
                                style={[styles.button, styles.buttonClose]}
                                onPress={ () => {
                                        Alert.alert(
                                            'Delete Job',
                                            'Would you like to delete this job?',
                                            [
                                                {text: 'Yes', onPress: () =>{
                                                        this.deleteJob();
                                                        this.setModalVisible(!isModalVisible);
                                                    }, 
                                                },
                                                {text: 'No', style: 'cancel'}
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
                                <TouchableOpacity 
                                    id='employeeModalExit'
                                    style={[styles.button, styles.buttonClose]} 
                                    onPress={ () =>
                                    {
                                        this.setModalTwo(!modalTwo);
                                        this.setModalVisible(!isModalVisible);
                                    }
                                }>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Search Employees */}
                            <Text style={styles.modalText}>Add Employees</Text>

                            {/* SEARCH BAR */}
                            <View styles={styles.search}>
                                <SearchBar></SearchBar>
                            </View>
                            <FlatList 
                                id='addEmployeeList'
                                style={styles.list}
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
        height: 200,
        marginTop: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    search: {
        paddingBottom: 50,
        marginBottom: 15,
    }
});
 
 
export default JobsList;