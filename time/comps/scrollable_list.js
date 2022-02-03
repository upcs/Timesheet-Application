import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native'


const[dataName] = useState([
    {name: 'Employee1'},
    {name: 'Employee2'},
    {name: 'Employee3'},
    {name: 'Employee4'},
    {name: 'Employee5'},
    {name: 'Employee6'},
    {name: 'Employee7'},
]);


//Render the Company logo in the center of the screen 
//With a sign-in button underneath
class ScrollableList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {dataName.map((item) => {
                    return (
                        <Text style={styles.item}>{item.name}</Text>                    
                    )
                        
               })}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue'
    },
    item: {
    }
});


export default ScrollableList;