/************************************************
 * Admin Jobsite Page
 * 
 * Author: Harrison Winters
 * Date: February 5, 2022
 ************************************************/

 import React from 'react';
 import {Color} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 import { useState } from 'react';
 import TimeSheetList from './TimeSheetList.js';
 import SearchBar from './search_bar.js';
import EmployeesList from './EmployeesList.js';  
import AddEmployee from './AddEmployee.js';


 //Jobsite Selection with a search bar and "add jobsite" button
 class AdminEmployee extends React.Component {
     constructor(props){
         super(props);
         this.currValue = this.currValue.bind(this);
         this.callbackFunction = this.callbackFunction.bind(this);

         this.state = {
            query: [],
            jobsDataChild: [],
            requesting: false,
          };

         //get a reference of the updateState from EmployeeList
        this.myref = React.createRef();
     }

     

    setQuery(newQuery) {
      return newQuery;

    }

    //Added
    //Callback Function from JobsList
    callbackFunction(childData) {


      this.setState({jobsDataChild : childData});
      this.setState({requesting : false});

    }
    

    getFilteredItems(query, items) {

      if (!query || query.length == 0) {
        return items;
      }

      return items.filter((accounts) => (accounts.firstname.toString().toLowerCase() + " " + accounts.lastname.toString().toLowerCase() ).includes(query.toString().toLowerCase()));
    }

    currValue(newValue) {
      this.setState({query : newValue});

      this.setState({requesting : true});
      this.forceUpdate(); 

    }
     
     render() {


      this.filteredItems = this.getFilteredItems(this.state.query, this.state.jobsDataChild);
      
       //This function is called whenever the add employee modal is submitted
        const addData = (params) => {
            employList = params;
            //Call reference to updateState
            this.myref.current.updateState();
        }

         return (
             <View style={styles.container}>
                 <View style={styles.upperbar}>
                    <SearchBar style={styles.search} currValue={this.currValue}></SearchBar>
                    
                    <View style={styles.buttonContainer}>
                        <AddEmployee sendData={addData} ></AddEmployee>
                    </View>
                    
                    
                </View>
                <EmployeesList ref={this.myref} query={this.state.query} request={this.state.requesting} parentCallback={this.callbackFunction} data={this.filteredItems}></EmployeesList>
             </View>
         ) 
     }
 }
 
 /*  Styles used for login screen */
 const styles = StyleSheet.create({
     container: {
        //  alignItems: 'center', 
        //  justifyContent: 'center',
        //  flex: 0.8
        backgroundColor: 'white'
        
     },

     upperbar: {
        
        display: 'flex',
        flexDirection: 'row',
        
     },

    //  logo: { 
    //      aspectRatio: 0.9, 
    //      resizeMode: 'contain'
    //  },
     add: {
       backgroundColor: Color.MAROON, 
       padding: 20, 
       marginTop: 12,
       borderRadius: 30,
       width: 100, 
       height: 10,
       alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
       marginHorizontal: 50,
       
    
     },
     text: {
         color: 'white',
         fontSize: 14,    
        position: 'absolute',
        // margin: 'auto',
        textAlign: 'center',
    },

    buttonContainer: {
       justifyContent: 'center', 
       position: 'relative',
    }
 });
 
 export default AdminEmployee;