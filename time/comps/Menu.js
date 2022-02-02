import React from 'react';
import Color from './Palette.js';
import { Text, View, StyleSheet } from 'react-native'
class Menu extends React.Component {
    render() {
        return (
            <View style={styles.menu_outer}><Text style={styles.title}>Menu</Text></View>
        )
    }
}


const styles = StyleSheet.create({
    menu_outer: {
      flex: 1,
      backgroundColor: Color.BG,
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      padding: 10,
      /* NOTE ALWAYS DO SIZES IN INTEGERS NO STRINGS ... OR IT CRASHES */
      fontSize: 60,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        lineHeight: 50,
    }
  });

export default Menu;