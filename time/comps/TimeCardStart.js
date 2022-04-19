/************************************************
 * Time Card Start Menu
 * 
 * Update: added timer functionality
 * Author: Jude Gabriel 
 * 
 * Author: Harrison Winters (Build off of Jude Gabriel's Login component)
 * Date: February 5, 2022
 ************************************************/


 
 
 //Company Logo with large "Start" button in the center of the screen

import React from 'react';
import {Color} from './Palette.js';

import { Picker, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import TimeUtil from './TimeUtil.js';


import Database from '../database-communication/database.js';
import User from '../database-communication/user.js'

/* Global Variables for time tracking */
var isPressed;
var sec = 0;
var min = 0;
var hour = 0;
var startTime = 0;
var endTime = 0;


/**
 * Timecard component
 * 
 * Features: 
 *      -Company Logo
 *      -Start/Stop Button for timing shifts
 *      -Daily time text
 */


 class TimeCardStart extends React.Component {

    /**
     * Constructor for the timecard component
     * 
     * @param {} props 
     */
    constructor(props){
        super(props);
        this.state = {
            todayTime: 0,
            lastTimerIn: 0,
            previousTodayDuration: 0,
            currentDuration: 0,
            isTimerOn: false,
            timerUpdater: null,
            isModalVisible: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            jobNames: [],
            selectedJobName: '',
        };
        this.timerOn = this.timerOn.bind(this);
        this.timerOff = this.timerOff.bind(this);
        this.signOut = this.signOut.bind(this); 
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.sortJobs = this.sortJobs.bind(this);
        this.updateJobList = this.updateJobList.bind(this);
        this.data = new Database(); 

    };


    componentDidMount = () => {
        this.updateJobList();
    }

    
    /**
     * Updates the picker list
     * 
     * Called when component mounts or when a user is added or removed from a job
     * 
     * @author gabes
     */
    updateJobList = () => {
        //Get all jobs the user is on
        this.data.updateEmpJobs(User.getId()).then((res,rej) => {

            //Sort the jobs by priority
            this.data.sortJobsByPriority(res, User.getId()).then((respo, rejo) => {
                this.setState({jList: respo}, () => {

                    //Get the information for each job
                    this.data.getSpecificJobs(respo).then((fin,fail) => {

                        //Get a final array: match priority to job info
                        this.sortJobs(respo, fin)
                    })
                });
            })
        })
    }



     /**
     * Matches the sorted id's, and unsorted job info
     * 
     * Sorted: an array containing only job id's that is sorted by priority
     * unsorted: an array containing all job specific info
     * 
     * 
     * @author Jude Gabriel 
     */
      sortJobs = (sorted, unsorted) => {
        var jobNames = [];
        var selectJob = [];
        
        //Match the unsorted array to the sorted array, store in final array
        for(var i = 0; i < sorted.length; i++){
            for(var j = 0; j < unsorted.length; j++){
                if(sorted[i] == unsorted[j].id){
                    jobNames.push(<Picker.Item label={unsorted[j].name} value={unsorted[j].name}/>);
                    selectJob.push(unsorted[i].name);
                }
            }
        }

        //Set the state for job names
        this.setState({jobNames: jobNames});

        //Set the first job in the list as the current job
        if((selectJob != undefined) || (selectJob != null) || (selectJob.length != 0)){
            this.setState({selectedJobName: selectJob[0]})
        }
    }



    handleClockOut= () => {
      this.props.sendData();
    }
    /**
     * Get user's first and last name
     * 
     * @author gabes
     */
    getUserInfo(){
        this.data.getUsersInfo(User.getId()).then((res, rej) => {
            this.setState({
                firstName: res[0],
                lastName: res[1],
                email: res[2],
            })
        })
    }

    /**
     * Get the users password
     * 
     * @author gabes
     */
    updatePassword(){
        this.data.setPassword(this.state.password, User.getId());
    }

    /**
     * Turns the timer off
     * 
     * Called when user pressed 'Stop' 
     * Calls totalTime() to total the new time added
     */
   async timerOff(){
        let { todayTime, currentDuration, lastTimerIn, timerUpdater,  } = this.state;

      //  todayTime += currentDuration;
        let previousTodayDuration = todayTime;
        currentDuration = 0;
        
        clearInterval(timerUpdater);

        this.setState({ 
            lastTimerIn, todayTime, currentDuration, previousTodayDuration,
            isTimerOn: false,
            timerUpdater: null,
        });

       await this.data.punchOut(User.getId());
       this.handleClockOut();
    }   

    /**
     * Starts the timer 
     * 
     * Called when the user presses 'Start" 
     */
    timerOn(){
        this.setState({
            isTimerOn: true,
            lastTimerIn: Date.now(),
            timerUpdater: window.setInterval(() => {
                let { currentDuration, lastTimerIn, todayTime, previousTodayDuration } = this.state;
                const actualCurrentDuration = Math.floor((Date.now() - lastTimerIn) / 1000);
                currentDuration++;
                if (actualCurrentDuration > currentDuration + 2) {
                    currentDuration = actualCurrentDuration;
                }
                todayTime = previousTodayDuration + currentDuration;
                this.setState({currentDuration, todayTime});
                
            }, 1000)

        });

        this.data.punchIn(User.getId(), this.state.selectedJobName);
    };


     /**
      * Called when user presses either start or stop
      * 
      * Starts or stopes a timer and updates the state
      */
     onPress = () => { 
        if (this.state.isTimerOn) {
          this.timerOff();
            
        } else {
            this.timerOn();
        }
    };


    /**
     * Signs user out of App
     * 
     * @author gabes
     */
    signOut = () => {
        this.props.initialParams.signOutParent();
    }

    /**
     * Change modal visibility
     *  
     * 
     * @author gabes 
     */
    setModalVisible = (visible) => {
        this.setState({isModalVisible: visible});
    }


    /**
     * Renders the start/stop button as well as company logo
     * Also renders a note showing daily time
     * 
     * @returns the timecard component 
     */
     render() {
        const { currentDuration, isTimerOn, todayTime } = this.state;
        const style = isTimerOn ? styles.stop : styles.start
        const text = isTimerOn ? "Clock-Out" : "Clock-In";

        const timeString = TimeUtil.convertMsToReadable(todayTime * 1000);
        let currentJob = "java";
        const { isModalVisible } = this.state;
        return (
            <View style={styles.justColor}>
            <View style={styles.container}>

                {/* COMPANY LOGO */}
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />

                {/* CLOCK IN BUTTON  */}
                <View>
                    <View style={styles.timerButtonOuter}>
                        <TouchableOpacity 
                            id='timerButton' 
                            style={[styles.button, style]} 
                            onPress={this.onPress}
                            backgroundColor='blue'
                        >
                            <Text style={styles.text}>{text}</Text>
                        </TouchableOpacity> 
                    </View>
                </View >


                {/* DROPDOWN LIST TO CHOOSE A JOB */}
                <View style={styles.picker}>
                    <Picker
                    style={{height: 0, width: 210}}
                    selectedValue={this.state.selectedJobName}
                    onValueChange={(itemLabel, itemValue) => {
                        this.setState({selectedJobName: itemLabel});
                    }}
                    >
                        {this.state.jobNames}
                    </Picker>
                </View>


                 <View style={styles.bottomContainer}>

                  {/* LOGOUT BUTTON */}
                 <View style={styles.logoutView}>
                       <TouchableOpacity 
                           style={styles.signOutButton}
                           onPress={this.signOut}
                       >
                               <Text style={styles.signOutText}>Sign Out</Text>
                           </TouchableOpacity>
                   </View>  

                    {/* ACCOUNT BUTTON */}
                   <View style={styles.logoutView}>
                       <TouchableOpacity 
                           style={styles.signOutButton}
                           onPress={ () => {
                               this.setModalVisible(!isModalVisible);
                               this.getUserInfo();
                           }}
                       >
                               <Text  style={styles.signOutText} adjustsFontSizeToFit={true}>Account</Text>
                           </TouchableOpacity>
                   </View> 

                   {/* EDIT ACCOUNT MODAL */}
                   <Modal
                        animationType='slide'
                        transparent={true}
                        visible = {isModalVisible}
                        onRequestClose = { () => {
                            this.setModalVisible(!isModalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>

                            <View  style={styles.blur}>
                                <View style={styles.modalView}>
                                    
                                        {/* THE EXIT BUTTON */}
                                        <View style={styles.leftView}>
                                            <TouchableOpacity 
                                            id='exitButton' 
                                            style={[styles.mbutton, styles.buttonClose]} 
                                            onPress={ () =>
                                            {
                                                this.setModalVisible(!isModalVisible);
                                            }}>
                                                <Text style={styles.textStyle}>X</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* USER'S NAME */}
                                        <Text style={styles.modalText}> 
                                            {this.state.firstName + " " + this.state.lastName}
                                        </Text>

                                        {/* CHANGE EMAIL */}
                                        <View style={styles.textAndTitle}>
                                            <Text style={styles.titles}>Email:</Text>
                                            <TextInput 
                                                id='email'
                                                style={styles.textArea} 
                                                defaultValue={this.state.email}
                                                onChangeText={ (text) =>{
                                                    this.setState({userLast: text})
                                                }}>
                                            </TextInput>
                                        </View>

                                        {/* CHANGE PASSWORD */}
                                        <View style={styles.textAndTitle}>
                                            <Text style={styles.titles}>New Password:</Text>
                                            <TextInput 
                                                id='password'
                                                style={styles.textArea} 
                                                defaultValue={''}
                                                secureTextEntry={true}
                                                onChangeText={ (text) =>{
                                                    this.setState({password: text})
                                                }}>
                                            </TextInput>
                                        </View>

                                        {/* SAVE CHANGES */}
                                        <TouchableOpacity
                                            id='saveChanges'
                                            style={[styles.mbutton, styles.buttonClose]}
                                            onPress={ () => {
                                                    this.setModalVisible(!isModalVisible);
                                                    this.updatePassword()
                                                }}>
                                                <Text style={styles.textStyle}>Save Changes</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                   </Modal>


                 </View> 
             </View>  
             </View>   
            ) 
        }
    }
 

 /**
  * Styles used for creating the timecard component 
  */
 const styles = StyleSheet.create({
     justColor: {
        backgroundColor: 'white',
        flex: 1
     },
     //Timecard container
     container: {
         alignItems: 'center', 
         justifyContent: 'center',
         flex: 0.7
     },

     //Styles for the logo
     logo: { 
         aspectRatio: 0.7, 
         resizeMode: 'contain',
         marginTop: 100,
     },

     bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: '5%',
        backgroundColor: 'white'
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
        marginTop: 25,
        justifyContent: 'center',
        },

        buttonOpen: {
        backgroundColor: Color.MAROON,
    },
    buttonClose: {
        backgroundColor: Color.MAROON,
    },

     logoutView: { 
         backgroundColor: 'white'
     },

     //Styles for start button
     timerButtonOuter: {
         width: 250,
         overflow: 'hidden',
         backgroundColor: 'white',
         margin: 0,
     },

     picker: {
        flexDirection: 'row',
        flex: 0,
        width: '50%',
        height: '30%',
        marginTop: '-5%',
        marginBottom: '15%',
     },
     button: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 35,
        height: 90,
        borderWidth: 5,
        alignItems: 'center',
        borderRadius: 40,
        borderColor: Color.MAROON
     },

     signOutButton: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 35,
        height: 70,
        borderWidth: 5,
        alignItems: 'center',
        backgroundColor: 'black',
        justifyContent: 'center'
     },

     signOutText: {
        alignItems: 'center',
        fontSize: 20,
        color: 'white',
        padding: 10,
        fontWeight: 'bold'
     },

     start: {
       borderColor: '#138564',
       backgroundColor: 'green',
       justifyContent: 'center'
     },

     //Styles for stop button
     stop: {
        borderColor: '#882244',
        backgroundColor: Color.MAROON, 
        justifyContent: 'center'
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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

    modalText: {
        marginBottom: 15,
        textAlign: "center", 
        fontWeight: 'bold',
        fontSize: 25
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

    titles: {
        padding: 15
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    mbutton: {
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        marginTop: 25
        },
        buttonOpen: {
        backgroundColor: Color.MAROON,
    },
    blur: {
        width: '100%',
        height: '100%',
        backgroundColor : 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center'
      },
    //Styles for text in the button
     text: {
         color: 'white',
         fontSize: 30,
         fontWeight: 'bold'
        
         

     },
 });
 
 export default TimeCardStart;