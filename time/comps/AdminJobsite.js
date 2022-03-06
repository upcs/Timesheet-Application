// /************************************************
//  * Admin Jobsite Page
//  * 
//  * Author: Harrison Winters
//  * Date: February 5, 2022
//  ************************************************/

//  import React from 'react';
//  import {Color} from './Palette.js';
//  import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
//  import { useState } from 'react';
//  import TimeSheetList from './TimeSheetList.js';
//  import SearchBar from './search_bar.js';
//  import AddJobsite from './AddJobsite.js'
//  import JobsList from './JobsList.js';


//  //Jobsite Selection with a search bar and "add jobsite" button
//  class AdminJobsite extends React.Component {
     
//      render() {
//         let jobData = {};
       
//         const addData = (params) => {
//             jobData = params;
//             console.log(jobData);
//         }
        
//          return (
//              <View style={styles.container}>
//                  <View style={styles.upperbar}>
//                     <SearchBar style={styles.search}></SearchBar>
//                     <View style={styles.buttonContainer}>
//                         <AddJobsite  sendData={addData}></AddJobsite>
//                     </View>
                    
                    
//                 </View>
//                 <JobsList></JobsList>
//              </View>
//          ) 
//      }
//  }
 
//  /*  Styles used for login screen */
//  const styles = StyleSheet.create({
//      container: {
//         //  alignItems: 'center', 
//         //  justifyContent: 'center',
//         //  flex: 0.8
        
//      },

//      upperbar: {
        
//         display: 'flex',
//         flexDirection: 'row',
        
//      },

//     //  logo: { 
//     //      aspectRatio: 0.9, 
//     //      resizeMode: 'contain'
//     //  },
//      add: {
//        backgroundColor: Color.MAROON, 
//        padding: 20, 
//        marginTop: 12,
//        borderRadius: 30,
//        width: 100, 
//        height: 10,
//        alignItems: 'center',
//         position: 'absolute',
//         justifyContent: 'center',
//        marginHorizontal: 50,
       
    
//      },
//      text: {
//          color: 'white',
//          fontSize: 14,    
//         position: 'absolute',
//         // margin: 'auto',
//         textAlign: 'center',
//     },

//     buttonContainer: {
//        justifyContent: 'center', 
//        position: 'relative',
//     }
//  });
 
//  export default AdminJobsite;

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
import AddJobsite from './AddJobsite.js'
import FakeJobsiteData from './FakeJobsiteData.js';



 //Jobsite Selection with a search bar and "add jobsite" button
 class AdminJobsite extends React.Component {

    constructor(props) {
      super(props);
        this.currValue = this.currValue.bind(this);
        this.state = {
          query: ""
        };

      

        const {jobs} = FakeJobsiteData;
        
        this.items = FakeJobsiteData;
        //this.query = "";
        
        

        const Item = ({ title }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
          </View>
        );

        this.renderItem = ({ item }) => (
          <Item title={item.jobName} />
        );
        
      }

      setQuery(newQuery) {
        return newQuery;

      }
      

      getFilteredItems(query, items) {
         if (!query) {
          return items;
         }
        return items.filter((jobs) => jobs.jobName.includes(query));
      }

      currValue(newValue) {
        //console.log(newValue);
        this.setState({query : newValue});
        console.log(this.state.query);
        this.forceUpdate();
        
      }
     
     render() {

      this.filteredItems = this.getFilteredItems(this.state.query, FakeJobsiteData);


      //Added 
      let jobData = {};
       
         const addData = (params) => {
             jobData = params;
            console.log(jobData);
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
                    <JobsList  data={this.filteredItems}></JobsList>
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