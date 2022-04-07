

/************************************************
 * Admin Jobsite Page
 * 
 * Author: Harrison Winters
 * Date: February 9, 2022
 ************************************************/

 import React from 'react';
 import {Color} from './Palette.js';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
 import { useState } from 'react';
 import TimeSheetList from './TimeSheetList.js';
 import SearchBar from './search_bar.js';
 import AddEmployee from './AddEmployee.js'
 import JobsList from './JobsList.js';
import FakeEmployeeData from './FakeEmployeeData.js';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native';
import AddJobsite from './AddJobsite.js'
import FakeJobsiteData from './FakeJobsiteData.js';



 //Jobsite Selection with a search bar and "add jobsite" button
 class AdminJobsite extends React.Component {


    constructor(props) {
      super(props);
        this.currValue = this.currValue.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        //Create reference of JobsList updateState
        this.myref = React.createRef();
        this.state = {
          query: [],
          jobsDataChild: [],
          requesting: false,
        };

        const {jobs} = FakeJobsiteData;



       function Item({ title }) {
          return (
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          );
        }

          this.renderItem = ({ item }) => (
            <Item title={item.jobName} />
          );
        
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
        return items.filter((jobs) => jobs.name.toString().toLowerCase().includes(query.toString().toLowerCase()));
      }

      currValue(newValue) {
        this.setState({query : newValue});


        this.setState({requesting : true});
        

        //adding from previous requestData function
       // this.child.current.sendData();

        this.forceUpdate();
        
      }

     


     render() {

      //this.filteredItems = this.getFilteredItems(this.state.query, FakeJobsiteData);
      this.filteredItems = this.getFilteredItems(this.state.query, this.state.jobsDataChild);
      //this.callbackFunction = this.callbackFunction();


      //Added 
      let jobData = {};
       
    const addData = (params) => {
        jobData = params;

        //Call updateState in JobsList
        this.myref.current.updateState();
    }


         return (
       
            <View style={styles.container}>
                 <View style={styles.upperbar}>
                     <SearchBar style={styles.search} currValue = {this.currValue}></SearchBar>
                     <View style={styles.buttonContainer}>
                       {/* <AddEmployee></AddEmployee> */}
                       <AddJobsite  sendData={addData}></AddJobsite>
                      </View>
                    

                 </View>
                 
                 <SafeAreaView style={styles.container}>
                    {/* <FlatList  style= {{backgroundColor: "white"}} renderItem={this.renderItem}  data = {this.filteredItems} ></FlatList> */}
                    <JobsList ref={this.myref} query={this.state.query} request={this.state.requesting} parentCallback={this.callbackFunction} data={this.filteredItems}></JobsList> 
                     {/* <JobsList ref={this.myref}></JobsList> */}
                 </SafeAreaView>
         


                    
                </View>
               
                  
         )
         
     }
 }
 
 /*  Styles used for login screen */
 const styles = StyleSheet.create({
     

     upperbar: {
        
        display: 'flex',
        flexDirection: 'row',
        
     },

  
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
        
         fontSize: 14,    
        position: 'absolute',
        textAlign: 'center',
    },

    buttonContainer: {
       justifyContent: 'center', 
       position: 'relative',
    }
 });
 
 export default AdminJobsite;