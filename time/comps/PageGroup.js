import React from 'react';
import { View } from 'react-native';
import { Color, style } from './Palette.js';
import PageOption from './PageOption';
/* props: {
    pageNames: string[],
    currentPage: number,
} */
class PageGroup extends React.Component {
    
    
    render() {
        const elList = this.props.pageNames.map((pageName, index) => 
            <PageOption pageName={pageName} isChosen={index == this.props.currentPage}/>
        )
        return (
            <View style={style.menu_inner}>
                {elList}
            </View>
        )
    }
}

export default PageGroup;