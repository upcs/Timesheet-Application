import React, {useEffect, useState} from 'react';
import { Color } from './Palette.js';
import { Text, View, StyleSheet, ScrollView,TouchableOpacity, Modal, Alert} from 'react-native'
import Menu from './Menu'
import Database from '../database-communication/database.js';

class Jobsite extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.dataParentToChild,
            isModalVisible: false,
            phase: 1,
            address: "123 abc lane",
            notes: "I want candy",
            name: "Job Name",
            cJID: "Job ID"
        }
        this.data = new Database();
    }

    componentDidMount = () => {
        this.data.getJobAddress("Cik0XoSFJLHTcA06sxmS").then((res, rej) => {
            this.setState({address: res}, () => {
                console.log(res);
            });
        });
        this.data.getJobNotes("Cik0XoSFJLHTcA06sxmS").then((res, rej) => {
            this.setState({notes: res}, () => {
                console.log(res);
            });
        });
        this.data.getJobName("Cik0XoSFJLHTcA06sxmS").then((res, rej) => {
            this.setState({name: res}, () => {
                console.log(res);
            });
        });
        this.data.getJobPhase("Cik0XoSFJLHTcA06sxmS").then((res, rej) => {
            this.setState({phase: res}, () => {
                console.log(res);
            });
        });
    }
    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }

    setJobNotes = (note) => {
        this.setState({notes: note});
    }
    setJobPhase = (jphase) => {
        this.setState({phase: jphase});
    }
    setJobAddress = (jad) => {
        this.setState({address: jad});
    }
    setJobName = (jn) => {
        this.setState({name: jn});
    }
    setJobID = (ji) => {
        this.setState({cJID: ji});
    }


    renderItem = ({item}) => {
        const { isModalVisible } = this.state;
         return (
             <View 
                id='employeeButtonView'
                style={styles.items}>
                 <TouchableOpacity id='employeeButton' onPress={() =>
                 {
                    this.setModalVisible(!isModalVisible);
                    this.setJobNotes(item.notes);
                    this.setJobPhase(item.phase);
                    this.setJobAddress(item.admin);
                    this.setJobName(item.name);
                    this.setJobID(item.id);
                 }}>
                     <Text>{item.name}</Text>
                 </TouchableOpacity> 
             </View>
         );
     };

    render() {
        return (
            <View style={styles.containerMaster}>
                <Modal
                    id='employeeModal'
                    animationType='slide'
                    transparent={true}
                    visible = {this.state.isModalVisible}
                    onRequestClose = { () => {
                        this.setModalVisible(!this.state.isModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        {/*this View adds the blurred background behind the modal*/}
                        <View style={styles.blur}>
                            <View style={styles.modalView} id='modalView'>
                                    <TouchableOpacity 
                                    id='closeButton'
                                    style={styles.exit}
                                    //Make sure user wants to exit when 'x' is pressed
                                    onPress={ () => {
                                        this.setModalVisible(!this.state.isModalVisible)}}
                                    >
                                 <Text style={styles.textStyle}>X</Text>
                                </TouchableOpacity>
                                <ScrollView style={styles.modalScrolV}>
                                    <View style = {styles.modalHeader}>
                                        <Text style ={styles.modalHeaderText}>Current Jobs</Text>
                                    </View>
                                    {/*
                                    <FlatList 
                                     id='list'
                                     data={this.state.FakeData} 
                                     keyExtractor={item => item.id.toString()}
                                     renderItem={this.renderItem} 
                                        />
                                        */
                                    }
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                </Modal>
                
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.switchJob} onPress={() => {
                         this.setModalVisible(!this.state.isModalVisible);
                    }}>  
                             <Text adjustsFontSizeToFit={true} style={styles.headerText}>{this.state.name}</Text> 
                    </TouchableOpacity>
                </View>
                <View style={styles.generalContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.basicText}>Address: {this.state.address}</Text> 
                    <Text adjustsFontSizeToFit={true} style={styles.basicText}>Current Phase: {this.state.phase}</Text> 
                </View>
                <View style={styles.notesContainer}>
                    <View style={styles.notesHeaderContainer}>
                    <Text adjustsFontSizeToFit={true} style={styles.notesHeader}>Notes</Text>
                    </View>
                    <View style={styles.notesScrollContainer}>  
                    <ScrollView>
                        <Text adjustsFontSizeToFit={true} style={styles.notesText}>{this.state.notes}</Text>
                    </ScrollView>
                    </View>
               </View>
            </View>
        )
    }
}

/*  Styles used for Jobsite screen */
const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: Color.MAROON,
        width: '100%',
        height: '10%',
        flex: 0.2
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
    containerMaster: {
        flex: 1
    },
    notesContainer: {
        flex: 0.6 
    },
    switchJob: {
        backgroundColor: 'rgba(0,0,0,0.1)', 
        borderRadius: 30,
        width: 200, 
        alignItems: 'center'   
    },
    notesHeaderContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: Color.MAROON,
        width: '100%',
        height: '10%',
        flex: 0.2
    },
    notesScrollContainer: {
        flex: 0.7
    },
    generalContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 0.3
    },
    exit:{
        backgroundColor: Color.MAROON,
        alignContent: 'center',
        width: '15%',
        borderRadius: 10,
        marginBottom: '10%'
      },
      basicText: {
        color: 'black',
        fontWeight: 'normal',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 25,
        textAlign: 'center'
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    notesText: {
        color: 'black',
        fontWeight: 'normal',
        marginHorizontal: '5%',
        fontSize: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      blur: {
        width: '100%',
        height: '100%',
        backgroundColor : 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center'
      },
    notesHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 35
    },
    modalHeaderText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
    },
    modalHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Color.MAROON
    },
    modalScrolV: {
        width: '100%',
        height: '100%'
    }

});

export default Jobsite;