import * as firebase from 'firebase'
import 'firebase/firestore' 





/**
 * Database class
 * 
 * Holds all methods for communication with database. 
 * 
 * To use, instantiate database object and call functions to read/write data
 * 
 * @author Jude Gabriel
 */
class Database {

    /**
     * Constructor for database class
     */
    constructor(){
        const firebaseConfig = {

            apiKey: "AIzaSyBQYb6hi0bNHIrHkGL2mdKFL1lnhMFwXeU",
          
            authDomain: "paint-46970.firebaseapp.com",
          
            databaseURL: "https://paint-46970-default-rtdb.firebaseio.com",
          
            projectId: "paint-46970",
          
            storageBucket: "paint-46970.appspot.com",
          
            messagingSenderId: "54402484337",
          
            appId: "1:54402484337:web:4b9d1cb00e07cd578df3d0",
          
            measurementId: "G-Y9P77GNJTH"
          
          };

        if(firebase.apps.length == 0){
            firebase.initializeApp(firebaseConfig);  
          }
        
        this.db = firebase.firestore();
        this.userList = [];
    }



    /****** ACCOUNT GETTERS *******/

    /**
     * Gets all accounts
     * 
     * Status: Done
     * Testing: Not Done
     */
    async getAllAccounts(){
        var postData = [];
        const data = await this.db.collection("accounts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                postData.push({...doc.data(), id: doc.id})
            });
          })
        return postData;
    }

    /**
     * Gets a specific user account
     */
    getSpecificAccount(){

    }

    /**
     * Gets users email
     */
    getAccountEmail(){

    }

    /**
     * Gets users first name
     */
    getUserFirst(){

    }

    /**
     * Gets users last name
     */
    getUserLast(){

    }

    /**
     * Gets users admin privelleges
     */
    getUserType(){

    }



    /****** ACCOUNT SETTERS *******/

    /**
     * Sets user type
     */
    async setUserType(id, type){
        if(id != null){
            if(type == 1){
                await this.db.collection("accounts").doc(id).update({admin: 1});
            }
            else{
                await this.db.collection("accounts").doc(id).update({admin: 0});
            }
        }
    }

    /**
     * DO WE NEED THIS???
     */
    setUserEmail(){

    }

    /**
     * Sets users firstname
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     */
    async setUserFirst(id, first){
        if(id != null){
            await this.db.collection("accounts").doc(id).update({firstname: first});
        }
    }

    /**
     * Sets users lastname
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     * 
     * @author Jude Gabriel
     */
    async setuserLast(id, last){
        if(id != null){
            await this.db.collection("accounts").doc(id).update({lastname: last});
        }
    }




    /****** CREATE ACCOUNT *******/

    /**
     * Creates a new user account
     * 
     * Status: Needs more edge cases
     * 
     * @author Jude Gabriel
     */
     createUserAccount(first, last, email, admin){
        //Error check null parameters
        first.trim();
        last.trim();
        email.trim();


        if((!first) || (!last) || (!email)){
            console.log("null parameter");
            return;
        }
        else if((first == " ") || (last == " ") || (email == " ")){
            console.log("null parameter");
            return;
        }
        else if((first == "") || (last == "") || (email == "")){
            console.log("null parameter");
            return;
        }

        //Error check for gmail account
        if(!email.includes("@gmail.com")){
            console.log("Invalid email");
            return;
        }

        //Error check admin privalleges
        if((admin != 0) && (admin != 1)){
            return;
        }


        this.db.collection("accounts").add({
            firstname: first,
            lastname: last,
            email: email,
            admin: admin
        });
     }


    /****** DELETE ACCOUNT *******/
    
    /**
     * Deletes a users account
     * 
     * Status: Need to test id edge cases
     *          Otherwise done
     * 
     * @author Jude Gabriel
     */
    async deleteUserAccount(id){
        if(id != null){
            await this.db.collection("accounts").doc(id).delete();
        }
    }


    /****** PUNCHES *******/

    /**
     * Clock in
     */
     punchIn(){

    }

    /**
     * Clock out
     */
    punchOut(){

    }

    /**
     * Get daily time
     */
    getDailyTime(){

    }

    /**
     * Get weekly time
     */
    getWeeklyTime(){

    }

    /**
     * Get time over a specific range
     */
    getRangeTime(){
        
    }


    /****** JOB GETTERS *******/

    /**
     * Get all jobs 
     */
    async getAllJobs(){
        var postData = [];
        const data = await this.db.collection("jobs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                postData.push({...doc.data(), id: doc.id})
            });
          })
        return postData;
    }

    /**
     * Get a specific job
     */
    getSpecificJob(){

    }

    /**
     * Get job address
     */
    getJobAddress(){

    }

    /**
     * Get job name
     */
    getJobName(){

    }

    /**
     * Get job phase
     */
    getJobPhase(){

    }

    /**
     * Get job employees
     */
    getJobEmployees(){

    }


    /****** JOB SETTERS *******/

    /**
     * Set job address
     */
    async setJobAddress(id, addy){
        if(id != null){
            await this.db.collection("jobs").doc(id).update({address: addy});
        }
    }

    /**
     * Set job name
     */
    async setJobName(id, jobname){
        if(id != null){
            await this.db.collection("jobs").doc(id).update({name: jobname});
        }
    }

    /**
     * Set job phase
     */
    setJobPhase(){

    }

    /**
     * Add employee to job
     */
    addEmployeeToJob(){

    }

    /**
     * Remove employee from job
     */
    removeEmployeeFromJob(){

    }

    /****** CREATE JOB *******/
    
    /**
     * Creates a job
     */
    createJob(){

    }

    /****** DELETE JOB *******/

    /**
     * Deletes a job
     */
    deleteJob(){

    }



}

export default Database;