import React from 'react';
import { Color, style } from './Palette.js';
import { Text, View, StyleSheet } from 'react-native';
import Icon from './Icon.js';


/*
    Should provide drop down for logout, etc. 
*/
class Hamburger extends React.Component {

    constructor (props) {
        super(props);
    }
    render() {
  
        const styleList = [style.button];
        // Default button style;
        //if (this.props.isChosen) styleList.push(style.selected)
        return (
            <View>
                <Text style={[style.button, style.clickable ]}>&#x2630;</Text>
            </View>
        );
    }
}


export default Hamburger;

