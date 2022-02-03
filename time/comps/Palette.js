import { StyleSheet } from 'react-native'

const Color = {
    BG: "white",
    NAV: "#ddd",
    BUTTON: "#eee",
    BUTTON_BORDER: "#999",
    BUTTON_SELECTED: "#ccc",
    MAROON: "#a70202",

}

const style = StyleSheet.create({
    clickable: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        margin: 3,
        borderWidth: 1,
        flexDirection: 'row',
    },
    button: {
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: Color.BUTTON,
        borderColor: Color.BUTTON_BORDER,
    },
    options: {
        width: 40,
        height: 40,
       
        fontSize: 15,
        lineHeight: 30,
        textAlign: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    selected: {
        backgroundColor: Color.BUTTON_SELECTED,     
    },
    menu_outer: {

        backgroundColor: Color.BG,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Color.BUTTON_BORDER,
    },
    menu_inner: {
      flex: 1,
      backgroundColor: Color.BG,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',

      /* NOTE ALWAYS DO SIZES IN INTEGERS NO STRINGS ... OR IT CRASHES */
      fontSize: 60,
 
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        lineHeight: 50,
    },
})

export { Color, style };