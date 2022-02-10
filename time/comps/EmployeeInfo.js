/*************************************************
 * Holds employee info to send to database
 * 
 * Author: Jude Gabriel
 * Date: February 8, 2022
 ***********************************************/

import { get } from "react-native/Libraries/Utilities/PixelRatio";


const userAccess = {
    BASIC: 1, 
    ADMIN : 2
};


class Employeeinfo{
    constructor(firstName, lastName, email, userType){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this. userType = userType;
    }

    //Getter for the first name;
    get firstName(){
        return this.firstName;
    }

    //Getter for the last name
    get lastName(){
        return this.lastName;
    }

    //Getter for the full name 
    get employeeName(){
        return this.lastName + ", " + this.firstName;
    }

    //Getter for the user type
    get userType(){
        return this.userType;
    }

    //Setter for the user type
    set userType(userAccess){
        this.userType = userAccess;
    }
}