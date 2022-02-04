import React from 'react';
import { View } from 'react-native';
import { Color, style } from './Palette.js';
import PageOption from './PageOption';
import USER from './User';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Jobsite from './Jobsite.js';
/* props: {
    pageNames: string[],
    currentPage: number,
} */

const Tab = createMaterialTopTabNavigator();

class PageGroup extends React.Component {
    
    render() {
       // const { user }  = this.props.route.params;
        let user = USER.Admin;
        let elList;
        if (user == USER.Admin) {
            elList = [
                <Tab.Screen name="Screen1">{(props) => <Jobsite  {...props}/>}</Tab.Screen>,
                <Tab.Screen name="Screen2">{(props) => <Jobsite  {...props}/>}</Tab.Screen>,
            ];
        } else {
            elList = [
                <Tab.Screen  name="Screen3">{(props) => <Jobsite  {...props}/>}</Tab.Screen>,

            ]
        }
    
        return (
            <Tab.Navigator>
                {elList}
            </Tab.Navigator>

        )
    }
}

export default PageGroup;