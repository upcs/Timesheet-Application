import { View, Text } from 'react-native';
import React from 'react';
import { style } from './Palette';
class Page extends React.Component  {
    render() {
        return (
            <View style={style.page}>
                <Text>
                    TEST TESST
                </Text>
            </View>
        );
    }
}

export default Page;