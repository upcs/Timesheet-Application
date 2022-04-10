/************************************************
 * Login screen for the application
 * 
 * Outside source used to create button:
 * https://www.youtube.com/watch?v=B1fCdhQs6Eg
 * 
 * Author: Jude Gabriel
 * Date: February 2, 2022
 ************************************************/

import React from 'react';
import {Color} from './Palette.js';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'

import Database from '../database-communication/database.js';

import User from '../database-communication/user.js'
//Render the Company logo in the center of the screen 
//With a sign-in button underneath
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            signedIn: 0,
            id: '',
            user: '',
            error: ''
        }
        this.data = new Database();
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser = () => {
        this.data.getSignIn(this.state.email, this.state.password).then((res, rej) => {
            if(res[0] == ""){
              this.setState({
                signedIn: 0,
                id: '',
                user: '',
                error: "Invalid Email or Password"
              });
            }
            else{
              this.setState({
                signedIn: 1,
                id: res[0],
                user: res[1],
                error: ''
              });

              User.setId(res[0]);
              User.setUser(res[1]);

              this.props.route.params.login(this.state.signedIn, 
                this.state.id, this.state.user);
            }
        });
    }

    resetPass = () => {
        this.data.resetPassword(this.state.email).then((res, rej) => {
            console.log("Reset password to 'password'");
          });
    }

 
    render() {
        return (
            <View style={styles.topView}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../assets/logo.jpg')} />

                    <TextInput 
                        id='email'
                        style={styles.textArea} 
                    // defaultValue='joey@gmail.com'
                        placeholder='Email'
                        keyboardType='email-address'
                        secureTextEntry={false}
                        onChangeText={(text) => {
                            this.setState({email: text.toLowerCase()})
                            }
                        }
                    >
                    </TextInput> 
                    <TextInput
                        id='password'
                        style={styles.textArea}  
                    // defaultValue='test'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({password: text})
                            }
                        }
                    >
                    </TextInput>
                    <TouchableOpacity id='signin' style={styles.login} onPress={() => this.loginUser()}>
                        <Text style={styles.text}>Sign-in</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity id='reset' style={styles.login} onPress={() => this.resetPass()}>
                        <Text style={styles.text}>Reset Password</Text>
                    </TouchableOpacity> 
                    <Text style={styles.errorText}>{this.state.error}</Text>
                </View>
            </View>
        ) 
    }
}

/*  Styles used for login screen */
const styles = StyleSheet.create({
    topView: {
        backgroundColor: 'white',
        flex: 1
    },
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 0.8
    },
    logo: { 
        aspectRatio: 0.9, 
        resizeMode: 'contain'
    },
    login: {

      backgroundColor: Color.MAROON, 
      padding: 20, 
      borderRadius: 30,
      width: 200, 
      alignItems: 'center',
      marginBottom: 5
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    textArea: {
        width: '80%',
        textAlign: 'center',
        padding: 15,
        marginBottom: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15
    },
    errorText: {
        padding: 30
    }
});

export default Login;