import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Color, style } from './Palette.js';
import Page from './Page';
import Menu from './Menu';
import Hamburger from './Hamburger.js';
import { createMaterialTopTabNavigator }  from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

/*
PageGroup: A list of PageOptions for selecting tab.

props: {
    pageNames: string[],
    currentPage: number,
} */
class PageGroup extends React.Component {
    

    
    render() {
        const elList = this.props.pageNames.map(name => 
            <Tab.Screen name={name} component={Page}  style={navStyle.nav} />
        );
        return (
            <Tab.Navigator tabBarComponent={Menu} style={navStyle.nav}>
                {elList}
            </Tab.Navigator>
        )
    }
}


const navStyle = StyleSheet.create({
    nav: {
      height: '100%',
      width: '100%',
    }
  });

export default PageGroup;