import React from 'react';
import { Color } from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import Menu from './Menu'

class Jobsite extends React.Component {
    render() {
        return (
            <View style={styles.containerMaster}>

                {/* <View style={styles.containerTop}>
                    <TouchableOpacity style={styles.navButton} onPress={this.onPress}>
                        <Text adjustsFontSizeToFit={true} style={styles.navText}>Card</Text>
                    </TouchableOpacity>
                    <View style={styles.blankButton}></View>
                    <TouchableOpacity style={styles.navButton} onPress={this.onPress}>
                        <Text adjustsFontSizeToFit={true} style={styles.navText}>Job</Text>
                    </TouchableOpacity>
                    <View style={styles.blankButton}></View>
                    <TouchableOpacity style={styles.navButton} onPress={this.onPress}>
                        <Text adjustsFontSizeToFit={true} style={styles.navText}>Hours</Text>
                    </TouchableOpacity>
                </View> */}
                <Menu></Menu>
                
                <View style={styles.containerBottom}>
                    <View style={styles.jobInfoContainer}>
                        <Text adjustsFontSizeToFit={true} style={styles.jobLocContainer}>Job Name FILLER</Text>
                        <Text adjustsFontSizeToFit={true} style={styles.jobLocContainer}>Address: FILLER</Text>
                    </View>
                    <TouchableOpacity style={styles.docImageContainer} onPress={this.onPress}>
                        <Text adjustsFontSizeToFit={true} style={styles.navText}>Safety Documents</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.docImageContainer} onPress={this.onPress}>
                        <Text adjustsFontSizeToFit={true} style={styles.navText}>Pictures</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

/*  Styles used for Jobsite screen */
const styles = StyleSheet.create({
    containerMaster: {
        flex: 1
    },
    containerTop: {
        flex: 0.1,
        backgroundColor: '#454545',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    //Large container taking up the bottom 90% of the screen
    containerBottom: {
        flex: 0.9,
        backgroundColor: Color.BG
    },
    //Navigation buttons at the top of the screen
    navButton: {
        borderRadius: 10,
        width: '25%',
        height: '50%',
        backgroundColor: Color.BUTTON,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //Used to add a buffer between the nav buttons
    blankButton: {
        width: '8.3%'
    },
    //Navigation button text
    navText: {
        color: 'red',
        fontSize: 50,
        textAlign: 'center'
    },
    docImageContainer: {
        flex: 0.35,
        borderRadius: 30,
        marginHorizontal: '10%',
        marginVertical: '5%',
        borderStyle: 'dotted',
        borderColor: 'black',
        borderWidth: 5,
        justifyContent: 'center',
    },
    
    jobInfoContainer: {
        flex: 0.3,
        justifyContent: 'center'
    },
    //Container used for the job name and Address
    jobLocContainer: {
        flex: 0.5,
        color: 'red',
        fontSize: 30,
        textAlign: 'center',
        margin: 20
    }
});

export default Jobsite;