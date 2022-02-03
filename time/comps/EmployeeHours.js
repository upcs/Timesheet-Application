import React from 'react';
import Color from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'

class EmployeeHours extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hours Worked Today:</Text>
                <Text>Hours Worked This Week:</Text>
                <Image style={styles.logo} source={require('../assets/logo.jpg')} />
            </View>
        ) 
    }
}

/* Create styles for employee hours */
const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});

export default EmployeeHours;