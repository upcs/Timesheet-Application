import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Hamburger from './comps/Hamburger';
import Icon from './comps/Icon';
import Jobsite from './comps/Jobsite';
import Login from './comps/login';
import Menu from './comps/Menu';
import EmployeeHours from './comps/EmployeeHours.js';
import PageGroup from './comps/PageGroup';
import PageOption from './comps/PageOption';
import { Color } from './comps/Palette.js';
export default function App() {
  return (
    <SafeAreaView style={safeAreaAndroid.SafeArea}>
      <Menu></Menu>
      <EmployeeHours></EmployeeHours>
    </SafeAreaView>
  );
}

const bodyStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
});

const safeAreaAndroid = StyleSheet.create({
/* https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices*/
    SafeArea: {
      flex: 1,
      paddingTop: 30,//StatusBar?.currentHeight || 0,
    }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
