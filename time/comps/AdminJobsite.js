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
 import AddEmployee from './AddEmployee.js'
 import JobsList from './JobsList.js';
import FakeEmployeeData from './FakeEmployeeData.js';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';

import { Button } from 'react-native';


 //Jobsite Selection with a search bar and "add jobsite" button
 class AdminJobsite extends React.Component {

    constructor(props) {
      super(props);
        this.currValue = this.currValue.bind(this, );
        this.state = {
          query: ""
        };

      

        const {employees} = FakeEmployeeData;
        this.items = FakeEmployeeData;
        //this.query = "";
        
        

        const Item = ({ title }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
          </View>
        );

        this.renderItem = ({ item }) => (
          <Item title={item.firstName} />
        );
        
      }

      setQuery(newQuery) {
        return newQuery;

      }
      

      getFilteredItems(query, items) {
         if (!query) {
          return items;
         }
        return items.filter((employee) => employee.firstName.includes(query));
      }

      currValue(newValue) {
        //console.log(newValue);
        this.setState({query : newValue});
       // console.log(this.state.query);
        this.forceUpdate();
      }
     
     render() {

      this.filteredItems = this.getFilteredItems(this.state.query, FakeEmployeeData);
      
         return (



            <View style={styles.container}>
                 <View style={styles.upperbar}>
                     <SearchBar style={styles.search} currValue = {this.currValue}></SearchBar>
                     <View style={styles.buttonContainer}>
                         <AddEmployee></AddEmployee>
                    </View>
                    
                 </View>
                 
                 <SafeAreaView style={styles.container}>
                    <FlatList  style= {{backgroundColor: "white"}} renderItem={this.renderItem}  data = {this.filteredItems} ></FlatList>
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
        // margin: 'auto',
        textAlign: 'center',
    },

    buttonContainer: {
       justifyContent: 'center', 
       position: 'relative',
    }
 });
 
 export default AdminJobsite;