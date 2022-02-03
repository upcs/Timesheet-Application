import React from 'react';
import { Color, style } from './Palette.js';
import { Text, View, StyleSheet } from 'react-native'

/*
props: {
    pageName: string,
    isChosen: boolean,
}  
state: {
    
}
*/
class PageOption extends React.Component {

    constructor (props) {
        super(props);

        
    }
    render() {
        
        const styleList = [style.clickable, style.button];
        // Default button style;
        if (this.props.isChosen) styleList.push(style.selected)
        return (
            <View >
                <Text style={styleList}>
                {this.props.pageName}
                </Text>       
            </View>
        );
    }
}


export default PageOption;

