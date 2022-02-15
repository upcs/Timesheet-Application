/*****************
 * PLACEHOLDER BUTTON. WILL NOT BE COMPELTED THIS SPRINT
 * A lot of the code from here: https://github.com/react-native-datetimepicker/datetimepicker
 */


 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Button} from 'react-native'
 import DateTimePicker from '@react-native-community/datetimepicker'

/**
 * Button that loads calendar on press
 */
export default function CalendarS(props) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [buttonText, setButtonText] = useState(props.name);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    try{
    changeText(selectedDate.toString().substring(0,11));
    }
    catch(error){
      console.log("error")
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const changeText = (text) =>{try {setButtonText(text); } catch(error){console.log("error")}}
  

     return (
        <View>
        <View>
          <Button onPress={showDatepicker} title={buttonText} color={Color.MAROON} />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
     );
}