import React from 'react';
import { Color } from './Palette.js';

import PageGroup from './PageGroup';
import Hamburger from './Hamburger';
import { Text, View, StyleSheet } from 'react-native';
import { style } from './Palette';

/*
Menu houses the top navigation section of the app. 
It has two sub components, a hamburger menu and a group of page tabs.

props: {
    user: string ('default' or 'admin')
}
*/


class Menu extends React.Component {
    render() {
        let pageNames;
        switch (this.props.user) {
            case 'admin':
                pageNames = ['Employees', 'Sites', 'Cards']
                break;
            case 'user': default:
                pageNames = ['Card', 'Job', 'Hours'];
                break;
        }
        const currentPage = 1;
        // Dummy data for now
        return (
            <View style={style.menu_outer}>
              <Hamburger />
              <PageGroup pageNames={pageNames} currentPage={currentPage} />
            </View>
        )
    }
}






export default Menu;