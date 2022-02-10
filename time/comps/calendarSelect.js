/*****************
 * PLACEHOLDER BUTTON. WILL NOT BE COMPELTED THIS SPRINT
 * A lot of the code from here: https://github.com/react-native-datetimepicker/datetimepicker
 */


 import React, {useState} from 'react';
 import {Color, style} from './Palette.js';
 import {View, Button} from 'react-native'
 import DateTimePicker from '@react-native-community/datetimepicker'
import { get } from 'core-js/core/dict';

/**
 * Button that loads calendar on press
 */
export default function CalendarS() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    let bName = "Pick Date"
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  function getDateOnly(st){
      let w = 0;
        for(i = 0; i < st.length; i++){
            if(st.charAt(i) == ' '){
                w++;
            }
            if(w == 3){
                return st.substring(0,i);
            }
        }
        return "";
  }
     return (
        <View>
        <View>
          <Button onPress={showDatepicker} title={"select date"} />
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
     )
 }

 