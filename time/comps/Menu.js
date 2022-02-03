import React from 'react';
import { Color } from './Palette.js';
import PageOption from './PageOption';
import PageGroup from './PageGroup';
import Hamburger from './Hamburger';
import { Text, View, StyleSheet } from 'react-native';
import { style } from './Palette';
class Menu extends React.Component {
    render() {

        const pageNames = ['Card', 'Job', 'Hours'];
        const currentPage = 1;
        //const propList = buttonTitles.map((title, i) => ({
         //   title, isChosen: (i == current),
       // }));
       // const list = propList.map(({title, isChosen}) => 
         //   <PageOption isChosen={isChosen} text={title} key={"PageOption" + title} />
      //  );
        return (
            <View style={style.menu_outer}>
              <Hamburger />
              <PageGroup pageNames={pageNames} currentPage={currentPage} />
            
            </View>
        )
    }
}






export default Menu;