/*****************
 *author: caden deutscher
 *renders a calendar that a user can select a date from
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

  //States
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    //Set button text state
    const [buttonText, setButtonText] = useState(props.name);

 //what to do when the user submits the calendar
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
  //function to change the text of the button
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