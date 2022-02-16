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
 import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native'
 
 
 /**
  * Creates a Scrollable List that can be selected
  * 
  * Data predefined currently (Sprint 1)
  */
 class JobsList extends React.Component {
     constructor() {
         super();
         this.state = {
             //Prepopulate with fake data
            data: [
               { item: "This is job 1"},
               { item: "This is job 2"},
               { item: "This is job 3"},
               { item: "This is job 3" },
               { item: "This is job 4" },
               { item: "This is job 5"},
               { item: "This is job 6"},
               { item: "This is job 7"},
               { item: "This is job 8" },
               { item: "This is job 10"},
               { item: "This is job 11"},
               { item: "This is job 12"},
               { item: "This is job 13"},
               { item: "This is job 14"},
               { item: "This is job 15"},
               { item: "This is job 16"},
            ],
         };
     }
 
     //Render each item as a button
     renderItem = ({item}) => {
         return (
             <View style={styles.item}>
                 <TouchableOpacity onPress={this.onPress}>
                     <Text >{item.item}</Text>
                 </TouchableOpacity>
             </View>
         );
     };
 
     //Create the flatlist
     render() {
         return (
             <View>
                 <FlatList 
                     data={this.state.data} 
                     renderItem={this.renderItem} 
                     keyExtractor={item => item.name}/>
             </View>
         );
     }
 }
 
 
 //Styles used for Scrollable list
 const styles = StyleSheet.create({
     item: {
         padding: 20,
         borderTopWidth: 1,
     }
 });
 
 
 export default JobsList;