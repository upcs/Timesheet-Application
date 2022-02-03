import React from 'react';
import { Color } from './Palette.js';
<<<<<<< Updated upstream
=======
import { NavigationContainer } from '@react-navigation/native';

>>>>>>> Stashed changes

import PageGroup from './PageGroup';
import Hamburger from './Hamburger';
import { Text, View, StyleSheet } from 'react-native';
import { style } from './Palette';

<<<<<<< Updated upstream
/*
Menu houses the top navigation section of the app. 
It has two sub components, a hamburger menu and a group of page tabs.

props: {
    user: string ('default' or 'admin')
}
*/

=======
>>>>>>> Stashed changes

class Menu extends React.Component {


    render() {
<<<<<<< Updated upstream
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
=======

        const pageNames = ['Card', 'Job', 'Hours']; 
        const currentPage = 1;
        //const propList = buttonTitles.map((title, i) => ({
         //   title, isChosen: (i == current),
       // }));
       // const list = propList.map(({title, isChosen}) => 
         //   <PageOption isChosen={isChosen} text={title} key={"PageOption" + title} />
         /*   <Tab.Screen name="Card" component={PageOption} />
         
                    <Tab.Navigator>
                <Tab.Screen name="Card2" component={PageOption} />
                    <Tab.Screen name="Card3" component={PageOption} />
                </Tab.Navigator>    */
      //  );
        return (
            <View style={style.menu_outer}>
                <Text>AAA</Text>
                <Hamburger />
                      
            
>>>>>>> Stashed changes
            </View>
        )
    }
}






export default Menu;