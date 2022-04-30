/* eslint-disable no-undef */
import logo from './logo.svg';
import React from 'react';
import './App.css';
import Panel from './comps/Panel.js';
import Data from './util/Database';
import { appendScript } from './comps/ScriptAdder'; 

/*
<script>
      document.addEventListener('DOMContentLoaded', function() {
        const loadEl = document.querySelector('#load');
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
        //
        // firebase.auth().onAuthStateChanged(user => { });
        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
          firebase.firestore().collection('accounts').get().then((results) => {
              results.forEach(result => {
                console.log(result.data());
                
              })
          })
          //doc('/foo/bar').get().then(() => { });
        // firebase.functions().httpsCallable('yourFunction')().then(() => { });
        // firebase.messaging().requestPermission().then(() => { });
        // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
        // firebase.analytics(); // call to activate
        // firebase.analytics().logEvent('tutorial_completed');
        // firebase.performance(); // call to activate
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

        try {
          let app = firebase.app();
          let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
          ].filter(feature => typeof app[feature] === 'function');
          console.log(app["firestore"]);
          loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
          console.error(e);
          loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }
      });
    </script>
    */

let scriptReady = false;
let componentMounted = false;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
    
    window.addEventListener('load', (function() {
      // when all the scripts are loaded...
      //console.log("constructor firebase test", firebase) //eslint-disable-line
     // scriptReady = true;
      //if (componentMounted) this.setState({ready: true});
      
      if (! firebase) throw new Error('Firebase should be loaded but is not...');
      Data.setFirebase(firebase);
      
      this.setState({ready: true});
    }).bind(this));
  }
  componentDidMount() {
    //componentMounted = true;
    //if (scriptReady) this.setState({ready: true});
    
      //let firebase;
     /* appendScript('/__/firebase/init.js?useEmulator=true', function() {
        console.log(firebase);
        console.log("Firebase loaded?");
        if (firebase) {
          firebase.firestore().collection('accounts').get().then((results) => {
            results.forEach(result => {
              console.log(result.data());
              
            })
        })
        }
      });*/


      // This line is a shitty hack. Do NOT TOUCH IT
      //if (!firebase) firebase = {}; //eslint-disable-line
      //console.log("firebase presence test: ", firebase); //eslint-disable-line
    //  let firebase = firebase; //eslint-disable-line
     //   const loadEl = document.querySelector('#load');
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
        //
        // firebase.auth().onAuthStateChanged(user => { });
        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
          
          //doc('/foo/bar').get().then(() => { });
        // firebase.functions().httpsCallable('yourFunction')().then(() => { });
        // firebase.messaging().requestPermission().then(() => { });
        // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
        // firebase.analytics(); // call to activate
        // firebase.analytics().logEvent('tutorial_completed');
        // firebase.performance(); // call to activate
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  /*      try {
          let app = firebase.app();
          let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
          ].filter(feature => typeof app[feature] === 'function');
          console.log(app["firestore"]);
          loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
          console.error(e);
          loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }*/
  }

  render() {
    const { ready } = this.state;
    //let firebase = {} // DELETE LATER;
    let panel = ready ? <Panel></Panel> : <></> //eslint-disable-line
    return (
      <div className="App">
      {panel} 
      
      </div>
    );
  }
}

export default App;
