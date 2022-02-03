import React from 'react';
import { Color, style } from './Palette.js';
import { Text, View, StyleSheet } from 'react-native';
import Icon from './Icon.js';
import PageOption from './PageOption.js';

/*
<View style={[style.options, style.clickable]}>
                    <Text>X</Text>
                </View>*/
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
                <PageOption pageName={"X"}/>
            </View>
        );
    }
}


export default Hamburger;

