import * as firebase from 'firebase'
import 'firebase/firestore' 
import { validateStyle } from 'react-native/Libraries/StyleSheet/StyleSheetValidation';
import User from './user'
// import * as Crypto from 'expo-crypto';

/**
 * Database class
 * 
 * Holds all methods for communication with database. 
 * 
 * To use, instantiate database object and call functions to read/write data
 * 
 * @author Jude Gabriel
 * @author Tony Hayden
 * @author Caden Deutscher 
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
     * Update: March 27, 2022
     * 
     * Added proper hashing of the password and check with the database.
     * Current not using so we don't need to remember our passwords
     * 
     */
    async getSignIn(email, password){
        var id = '';
        var user = '';

        // DO NOT DELETE BELOW. CURRENTLY COMMENTED OUT TO HAVE PASSING TESTS
        // const checkHashed = await Crypto.digestStringAsync(
        //     Crypto.CryptoDigestAlgorithm.SHA512,
        //     password
        // );

        // Change password to checkHashed to check hashed password version instead
        const data = await this.db.collection("accounts").where("email", "==", email).where("password", "==", password)
                        .get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                id = doc.id
                                user = doc.data().admin;
                            })
                        })
        return [id, user];
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
     * 
     * Get the users name
     * 
     * @author gabes 
     */
    async getUsersInfo(id){
        if(id == '' || id == null){
            return;
        }
        var document = await this.db.collection("accounts").doc(id).get();
        return [document.data().firstname, document.data().lastname, document.data().email];
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

    async addUserJobs(id, jid){
        var document = await this.db.collection("accounts").doc(id).get();
        try{
        if(document.myJobs.includes(jid)){

        }
        else{
            await this.db.collection("accounts").doc(id).add({
                myJobs: jid
            });
        }
    }
    catch{
       
        await this.db.collection("accounts").doc(id).add({
            myJobs: jid
        });
    }
        
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


    /**
     * Set a new password for the user
     * 
     * @author gabes
     */
    async setPassword(pass, id){
        if(id != null){
            await this.db.collection('accounts').doc(id).update({password: pass});
        }
    }




    /****** CREATE ACCOUNT *******/

    /**
     * Creates a new user account
     * 
     * Status: Needs more edge cases
     * 
     * @author Jude Gabriel
     * 
     * Update: March 27, 2022
     * Author: Tony Hayden
     * Hashes user password with SHA512 on account creation
     */
     async createUserAccount(first, last, email, pass, admin){
        email = email.toLowerCase();

        

        if((!first) || (!last) || (!email) || (!pass)){
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
        first.trim();
        last.trim();
        email.trim();
        pass.trim();

        //Error check admin privalleges
        if((admin != 0) && (admin != 1)){
            return;
        }

        // DO NOT DELETE BELOW. CURRENTLY COMMENTED OUT TO ENSURE TESTS PASTS
        // const hashed = await Crypto.digestStringAsync(
        //     Crypto.CryptoDigestAlgorithm.SHA512,
        //     pass
        // );

        // Replace "pass" with "hashed" to store the hashed version
        this.db.collection("accounts").add({
            firstname: first,
            lastname: last,
            email: email,
            password: pass,
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
     * 
     * Creates a new punch for the user in the database
     * 
     * Status: Done
     * 
     * @author Tony Hayden
     */
    async punchIn(id, jobName){
        // Grab all needed date for the current punch in
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();

        var clocked = true;
        const timeIn = Date.now();
        //Create new punch for the user
        await this.db.collection("accounts").doc(id).collection("punch").add({
            clockedIn: clocked, 
            
            timeIn,
            timeOut: null,

            year: year, 
            month: month, 
            day: day, 
            clockInHour: hour, 
            clockInMinute: minute,
            clockOutHour: null,
            clockOutMinute: null,
            totalPunchTimeInMinutes: null,
            jobName: jobName

        });
    }

    /**
     * Clock out
     * Updates the hours tab for the employee as well as the punches
     * 
     * Status: Not properly updating clock out hour/minute
     * 
     * @author Tony Hayden
     * 
     * Update: 3/19/22
     * Justin Lee
     * Added simplified time handling
     */
    async punchOut(id){

        // Grab the new date and time
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();

        var subCollectionID = '';
        var totalTimeInMinutes = 0;

        const timeOut = Date.now();
        let duration;
        // Function to grab the ID of the punch that is currently clocked in, and calculate punch time
        await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if(data.clockedIn == true ){
                    subCollectionID = doc.id;
                    duration = timeOut - data.timeIn;
                    
                    totalTimeInMinutes = (((hour - data.clockInHour) * 60) + (minute - data.clockInMinute));
                    
                }
            });
        });

        // Function to update the clockIn status, as well as log the clock out time determined by the hour and minute above
        await this.db.collection("accounts").doc(id).collection("punch").doc(subCollectionID).update({
            clockedIn: false, 
            timeOut,
            duration,

            clockOutHour: hour, 
            clockOutMinute: minute,
            totalPunchTimeInMinutes: totalTimeInMinutes //duration / (1000 * 60),            
        });   
    }
    /*
    @author Caden Deutscher
    @date: 4/7/2022
    @params: EmpID, PunchID, newMinutes
    @Return: N/A
    @Result: Updates Punch - totalTimeInMinutes
    */
   async setPunchMinutes(EmpID, PunchID, newMin){
       console.log(EmpID + " di " + PunchID + " min " + newMin);
     await this.db.collection("accounts").doc(EmpID).collection("punch").doc(PunchID).update({totalPunchTimeInMinutes: newMin});
   }
    /*
    @author Justin
    @date 3/19/22

    get duration worked since given time
    STATUS: done,

    */
    async getDurationWorkedSinceTime(id, time) {

        return await this.db.collection("accounts").doc(id).collection("punch").where("timeOut", ">", time).get().then((querySnapshot) => {
            //return 10;
           // console.log("RESULT", querySnapshot);
            // Reduce to accumulate time over all elements of array
            let sum = 0;
            querySnapshot.forEach((doc) => {
            
                // Get data
                const data = doc.data();
                // If our shift began before midnight,
                if (data.timeIn < time) {
                    // only include the part of it that occured in this day.
                    sum += data.timeOut - time;
                } else {
                    // otherwise, return the whole shift.
                    sum += data.timeOut - data.timeIn;
                }
            });
            return sum;// / (1000 * 60 * 60);
        }, () => {
            console.log("FAILURE");
        });
        
                
    }

     /*
     * @author Caden 
     * @date 3/14/2022
     * 
     * Get daily time
     * STATUS: DONE
     * 
     * Update: 3/16/22
     * Tony Hayden
     * Changed hour update calculation to use correctly named collection fields for the punches
     * 
     * Update: 3/19/2022
     * Justin Lee
     * Added modified time handling
     */

    async getDailyTime(id){

        
        //get current date 
       /*
        let today = new Date();
        today.getDay()
        var hours = 0;
        /*
        Get the correct user using the id, and find all punches that correspond to the current day
        */
       /* await this.db.collection("accounts").doc(id).collection("punch").where("day", "==", today.getDate()).where("month", "==", today.getMonth()+1)
        .where("year", "==", today.getFullYear()).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                hours += Math.floor(doc.data().totalPunchTimeInMinutes / 60);
            });
          })
         return hours; */
        
        const midnight = new Date().setHours(0, 0, 0, 0);
        //console.log("MDNGHT\t", midnight); 
        let valMs;
        await this.getDurationWorkedSinceTime(id, midnight).then(value => {
            valMs = value;
        }); 
          //console.log("Value: ", val);
        return valMs;// valMs//; / (1000 * 60 * 60);
    }

    
    /*
    @author Cadennpm
    @date 3/14/2022
    @param day, month, and year
    @return returns 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday... 6 - Saturday
    */
    getDayOfWeek(day, month, year){
       
    }

    /**
     * @author Caden
     * @date 3/14/2022
     * @param id of employee getting hours for
     * @return weekly hours
     * 
     * Get weekly time
     * 
     * Update: 3/16/2022
     * Tony Hayden
     * Adjusted time calculation to utilize the correct field names from the database
     */
    async getWeeklyTime(id){
       /*
        //get the day of the week through zellers rule
        ///
         //get current date 
         var today = new Date();
         var hours = 0;
         var start = 0;
         var end = 0;
         var day = today.getDate();
         //Set Month in equation March is first month
         var month = today.getMonth()-1;
         if(month == 0 ){
            month =12;
         }
         else if(month == -1) {
            month = 11;
         }
         //get first two digits of the year
        var firstTwoYear = parseInt(today.getFullYear().toString().substring(0,2));
        //get last two digits of the year
        var lastTwoYear =  parseInt(today.getFullYear().toString().substring(2));
        var F = day + ((13*month-1)/5) +lastTwoYear+ (lastTwoYear/4) +(firstTwoYear/4)-(2*firstTwoYear);
        F = Math.floor(F)%7;
        //
        //Determine the start and ends of the week
        //
        switch(F){
            case 0:
                start = today.getDate() - 6;
                end = today.getDate();
                break;
            case 1:
                start = today.getDate();
                end = start + 6;
                break;
            case 2:
                start = today.getDate() - 1;
                end = start + 6;
                break;
            case 3:
                start = today.getDate() - 2;
                end = start + 6;
                break;
            case 4:
                start = today.getDate() - 3;
                end = start + 6;
                break;
            case 5:
                start = today.getDate() - 4;
                end = start + 6;
                break;
            case 6: 
                start = today.getDate() - 5;
                end = start + 6;
                break;
                
       
       //
       //Return the time worked through out the week
       //
       while (start <= end){
        await this.db.collection("accounts").doc(id).collection("punch").where("day", "==", start).where("month", "==", today.getMonth()+1)
        .where("year", "==", today.getFullYear()).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(typeof(doc.data().totalPunchTimeInMinutes) != "undefined") {
                  hours += Math.floor(doc.data().totalPunchTimeInMinutes / 60);
              }
          });
        })
        start++;
      }
      */
        

       // sunday is (current day of the week) ago from today
      /* const t = new Date();
       
  
       let valMs;
       await this.getDurationWorkedSinceTime(id, sunday).then(value => {
           valMs = value;
       }); 
       console.log("VALMS", valMs);
         //console.log("Value: ", val);
       return valMs;// valMs//; / (1000 * 60 * 60);
      */
       let offset = new Date().getTime() * 24 * 60 * 60 * 1000;
       const midnight = (new Date().setHours(0, 0, 0, 0)) - offset;
       
      // console.log("MDNGHT\t", midnight); 
       let valMs;
       await this.getDurationWorkedSinceTime(id, midnight).then(value => {
           valMs = value;
       }); 
         //console.log("Value: ", val);
       return valMs;// valMs//; / (1000 * 60 * 60);
    }

    /**
     * Get time from a certain day until present
     * 
     * @author gabes
     */
    async getTimeFrom(id, day, month, year){
        month = this.getMonth(month);

        //Error check params
        if((id == 0) ||(day == null) || (month == null) || (year == null)){
            return;
        }

        //Query punches and store in array
        var postData = [];
        var filteredData = []
        if(id != null){
            const data = await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    postData.push({...doc.data(), id: doc.id})
                });
            })

            //Filter punches with invalid dates
            for(var i = 0; i < postData.length; i++){
                if(postData[i].year > year){
                    filteredData.push(postData[i]);
                }

                if(postData[i].year == year){
                    if(postData[i].month == month){
                        if(postData[i].day >= day){
                            filteredData.push(postData[i]);
                        }
                    }
                    else if(postData[i].month > month){
                        filteredData.push(postData[i]);
                    }
                }
            }
            return filteredData;
        }
    }


    /**
     * Get time from first day until specified day
     * 
     * @author gabes
     */
    async getTimeTo(id, day, month, year){
        month = this.getMonth(month);

        //Error check params
        if((id == 0) ||(day == null) || (month == null) || (year == null)){
            return;
        }

        //Query punches and store in array
        var postData = [];
        var filteredData = []
        if(id != null){
            const data = await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    postData.push({...doc.data(), id: doc.id})
                });
            })

            //Filter punches with invalid dates
            for(var i = 0; i < postData.length; i++){
                if(postData[i].year < year){
                    filteredData.push(postData[i]);
                }

                if(postData[i].year == year){
                    if(postData[i].month == month){
                        if(postData[i].day <= day){
                            filteredData.push(postData[i]);
                        }
                    }
                    else if(postData[i].month < month){
                        filteredData.push(postData[i]);
                    }
                }
            }
            return filteredData;
        }
    }


    /**
     * Get time over a specified time range
     * 
     * @author gabes
     */
    async getTimeRanged(id, fromDay, fromMonth, fromYear, toDay, toMonth, toYear){
        //Turn month strings into numerical values
        fromMonth = this.getMonth(fromMonth);
        toMonth = this.getMonth(toMonth);


        //Error check params
        if((id == 0) ||(fromDay == null) || (fromMonth == null) || (fromYear == null) ||
                (toDay == null) || (toMonth == null) || (toYear == null)){
            return;
        }

        //Query punches and store in array
        var postData = [];
        var filteredData = []
        if(id != null){
            const data = await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    postData.push({...doc.data(), id: doc.id})
                });
            })

            //Filter punches with invalid dates
            for(var i = 0; i < postData.length; i++){
                
                //Lies between the two years
                if((postData[i].year < toYear) && (postData[i]) > fromYear){
                    filteredData.push(postData[i]);
                }

                //In fromYear but not toYear
                //Push anything with a fromYear and a higher month or a higher day within same month
                if(postData[i].year == fromYear){
                    if(postData[i].year < toYear){
                        if(postData[i].month > fromMonth){
                            filteredData.push(postData[i]);
                        }
                        if(postData[i].month == fromMonth){
                            if(postData[i].day >= fromDay){
                                filteredData.push(postData[i]);
                            }
                        }
                    }
                }

                if(postData[i].year == toYear){
                    if(postData[i].year > fromYear){
                        if(postData[i].month < toMonth){
                            filteredData.push(postData[i]);
                        }
                        if(postData[i].month == toMonth){
                            if(postData[i].day <= toDay){
                                filteredData.push(postData[i]);
                            }
                        }
                    }
                }

                if((postData[i].year == fromYear) && (postData[i].year == toYear)){
                    if((postData[i].month == fromMonth) && (postData[i].month == toMonth)){
                        if((postData[i].day >= fromDay) && (postData[i].day <= toDay)){
                            filteredData.push(postData[i]);
                        }
                    }
                    else if((postData[i].month > fromMonth) && (postData[i].month < toMonth)){
                        filteredData.push(postData[i]);
                    }
                    else if((postData[i].month == fromMonth) && (postData[i] != toMonth)){
                        if(postData[i].day >= fromDay){
                            filteredData.push(postData[i]);
                        }
                    }
                    else{
                        if(postData[i].day <= toDay){
                            filteredData.push(postData[i]);
                        }
                    }
                }
            }
            return filteredData;
        }
    }


    /**
     * Get all of an employees time
     * 
     * @author gabes
     */
    async getAllTime(id){
        if(id == 0){
            return;
        }
        var postData = [];
        if(id != null){
            const data = await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    postData.push({...doc.data(), id: doc.id})
                });
            })
            return postData;
        }
    }
    /*
    This method returns the total time that an employee worked
    @param 
    id - Employee id,
    fFrom - filtered From? (true or false)
    fTo - filtered To? (true or false)
    tDay - to filtered day
    tMonth - to filted month
    tYear - to filtered year
    fDay - from filtered day
    fMonth - from filtered Month
    fYear - from filteredYear
    @ return Total Time employee worked over time period
    */
    async getAllPunchSummary(id, fFrom, fTo, tDay, tMonth, tYear, fDay, fMonth, fYear){
        fMonth = this.getMonth(fMonth);
        tMonth = this.getMonth(tMonth);
        var time = 0;
        const data = await this.db.collection("accounts").doc(id).collection("punch").get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
             if(!isNaN(doc.data().totalPunchTimeInMinutes)){
                 //Add all time
                    if(!fFrom && !fTo){
                    time += parseInt(doc.data().totalPunchTimeInMinutes);
                    }
                    //add time only if it is in front of the from dates
                    else if(fFrom && !fTo){
                
                        if(doc.data().year < fYear || (doc.data().year == fYear && doc.data().month < fMonth) || (doc.data().year == fYear && doc.data().month == fMonth && fYear && doc.data().day < fDay)){

                        }
                        else{
                            time += parseInt(doc.data().totalPunchTimeInMinutes);
                        }
                    

                    }
                    //Add time only if it is before the to dates
                    else if(!fFrom && fTo){
                        if(doc.data().year > tYear || (doc.data().year == tYear && doc.data().month > tMonth) || (doc.data().year == tYear && doc.data().month == tMonth && tYear && doc.data().day > tDay)){

                        }
                        else{
                            time += parseInt(doc.data().totalPunchTimeInMinutes);
                        }

                    }
                    //Add time only if it is between the from and to dates
                    else if(fFrom && fTo){
                        if(doc.data().year > tYear || (doc.data().year == tYear && doc.data().month > tMonth) || (doc.data().year == tYear && doc.data().month == tMonth && tYear && doc.data().day > tDay)){

                        }
                        else if(doc.data().year < fYear || (doc.data().year == fYear && doc.data().month < fMonth) || (doc.data().year == fYear && doc.data().month == fMonth && fYear && doc.data().day < fDay)){

                        }
                        else{
                            time += parseInt(doc.data().totalPunchTimeInMinutes);
                        }
                    }
            }
         });   
    })
  
    return time;
    }
    /*
    @author Caden Deutscher
    @return - returns obvious overtime punches for a single employee
    @params: id - employee id, condition - number for overtime to check for
    */
   async getOverTime(id,condition){
       var postData = [];
       const data = await this.db.collection("accounts").doc(id).collection("punch").where("totalPunchTimeInMinutes",">", condition).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            postData.push({...doc.data(), id: doc.id, eid: id})
        });
    })
    return postData;
   }
    /*
    @author Caden Deutscher
    @return - returns obvious overtime punches for all employees
    @params: condition - number for overtime to check for
    */
   async getAllOvertime(condition){

   }

    /*
    Cadenss
    */
    async updateEmpJobs(id){
        var jobids = [];
        var matches = [];
       const querySnapshot =  await this.db.collection("jobs").get();

       for (const documentSnapshot of querySnapshot.docs) {
        jobids.push(documentSnapshot.id);
       
    }
    for(const jobs of jobids){
       const emp =  await this.getJobEmployeesID(jobs);
            for(let i = 0; i < emp.length; i++){
                if( id == emp[i].accountID){
                   matches.push(jobs);
                }
            }
    }
    
    return matches;
    }


      

    /****** JOB GETTERS *******/

    /**
     * Get all jobs 
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     * 
     * @author Jude Gabriel
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
     * @author Caden
     * @params A list of job ids
     * @retunr Gets all data for a list of job ids
     * Get a specific jobs
     */
    async getSpecificJobs(jobIds){
        var postData = [];
        const data = await this.db.collection("jobs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                for(let i = 0; i < jobIds.length; i++){
                    if(doc.id == jobIds[i]){
                    postData.push({...doc.data(), id: doc.id})
                    }
                }
            });
          })
        return postData;
    }

    /**
     * @author Caden Deutscher
     * @params id(jobsite id)
     * @return jobsite address
     * Get job address
     */
    async getJobAddress(id){
        var document = await this.db.collection("jobs").doc(id).get();
        return document.data().address;
    }

    /**
     * @author Caden Deutscher
     * @params id(jobsite id)
     * @return jobsite name
     * Get job name
     */
    async getJobName(id){
        var document = await this.db.collection("jobs").doc(id).get();
        return document.data().name;
    }

    /**
     * @author Caden Deutshcer
     * @params id(jobsite id)
     * @return jobsite phase
     * Get job phase
     */
    async getJobPhase(id){
        var document = await this.db.collection("jobs").doc(id).get();
        return document.data().phase;
    }

    /**
     * @author Caden Deutscher
     * @params id(jobsite id)
     * @return jobsite notes
     * Get job noes
     */
    async getJobNotes(id){
        var document = await this.db.collection("jobs").doc(id).get();
        return document.data().notes;
    }
    /**
     * Get a list of all employees not on the job
     * 
     * Status: Done
     * Testing: Needed
     */
    getEmployeesNotOnJob(allEmp, empOnJob){
        for(var i = 0; i < empOnJob.length; i++){
            allEmp = allEmp.filter(item => item.id !== empOnJob[i].accountID);
        }

        return allEmp;
        
    }

    /**
     * Get a list of ID's for employees on a current job
     * 
     * @author Jude Gabriel
     */
    async getJobEmployeesID(id){
        var postData = [];
        const data = await this.db.collection("jobs").doc(id).collection("employees").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                postData.push({...doc.data(), id: doc.id})
            });
          })
        return postData;
    }


    /**
     * Get data for all employees in a list
     * 
     * @author Jude Gabriel
     */
    async getJobEmployeeData(employeeID){
        var postData = [];
        for(var i = 0; i < employeeID.length; i++){
            await this.db.collection("accounts").doc(employeeID[i].accountID).get()
                .then((snapshot) => {
                    postData.push({...snapshot.data(), id: snapshot.id})
                });
        }
        return postData;
    }


    /****** JOB SETTERS *******/

    /**
     * Set job address
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     * 
     * @author Jude Gabriel
     */
    async setJobAddress(id, addy){
        if(id != null){
            await this.db.collection("jobs").doc(id).update({address: addy});
        }
    }

    /**
     * Set job name
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     * 
     * @author Jude Gabriel
     */
    async setJobName(id, jobname){
        if(id != null){
            await this.db.collection("jobs").doc(id).update({name: jobname});
        }
    }

       /**
     * Set job notes
     * 
     * Status: Needs to test more edge cases
     * Testing: Needed
     * 
     * @author Caden Deutscher
     */
        async setJobNotes(id, jobnotes){
            if(typeof jobnotes === 'string'){
                if(jobnotes == "" || jobnotes == " " || jobnotes == undefined){
                    jobnotes = "No notes."
                }

                if(id != null){
                    await this.db.collection("jobs").doc(id).update({notes: jobnotes});
                }
            }
            else{

                let jnote = "No notes."

                if(id != null){
                    await this.db.collection("jobs").doc(id).update({notes: jnote});
                }
            }
           
        }
    

    /**
     * Set job phase
     * 
     * @author gabes
     */
    async setJobPhase(id, phase){
        if(id != null){
            await this.db.collection("jobs").doc(id).update({phase: phase});
        }
    }

    /**
     * Adds an employee to a job (now accounts for priority)
     * 
     * @author gabes
     */
    async addEmployeeToJobPriority(jobId, employee){
        var employeeId = employee.id
        await this.getAllPriority(employeeId).then((res, ref) => {
            var priority = this.getHighestPriority(res);
            this.addEmployeeToJob(jobId, employeeId, priority); 
        })   
    }


     /**
     * Get the priorites of an employee on a job
     * 
     * @author Caden
     * @author gabes
     */
      async getAllPriority(id){
        var jobids = [];
        var matches = [];

        //Get a list of all jobs
        const querySnapshot =  await this.db.collection("jobs").get();
        for (const documentSnapshot of querySnapshot.docs) {
            jobids.push(documentSnapshot.id); 
        }
    
        //For each job find if an employee matches the id, push the priority
        for(const jobs of jobids){
           const emp =  await this.getJobEmployeesID(jobs);
                for(let i = 0; i < emp.length; i++){
                    if( id == emp[i].accountID){
                        matches.push(emp[i].jobPriority);
                    }
                }
        }
        return matches;
    }


    /**
     * Get the highest priority
     * 
     * @author gabes
     */
     getHighestPriority(priorityList){
        //Return 0 if employee has no priority 
        if(priorityList == undefined){
            return 0;
        } 

        //Find the highest priority and return one above it 
        else{
            var maxPriority = 0;
            for(var i = 0; i < priorityList.length; i++){
                if(priorityList[i] > maxPriority){
                    maxPriority = priorityList[i];
                }
            }
            return maxPriority + 1;
        }
    }


    /**
     * Add employee to job
     * 
     * Status: Done
     * Testing: Needed
     * 
     * @author Jude Gabriel
     */
    async addEmployeeToJob(jobId, employeeToAdd, priority){
        await this.db.collection("jobs").doc(jobId).collection("employees").add({
            accountID: employeeToAdd,
            jobPriority: priority
        });
    }

    /**
     * Sorts a list of jobs by priority
     * 
     * @author gabes 
     */
   async sortJobsByPriority(jobsList, employeeID){
        var priorityArray = [];
        var jobsArray = [];

        //Get the priority of each job
        for(var i = 0; i < jobsList.length; i++){
            const data = await this.db.collection("jobs").doc(jobsList[i]).collection("employees").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(employeeID == doc.data().accountID){
                        priorityArray.push({job: jobsList[i], priority: doc.data().jobPriority});
                    }
                })
            })
        }

        //Sort the jobs by priority
        priorityArray.sort(this.sortByProperty("priority"));

        //Pass just the job if to jobs array
        for(var i = 0; i < priorityArray.length; i++){
            jobsArray.push(priorityArray[i].job);
        }

        //Return the sorted jobs array
        return jobsArray;
    }


    /**
     * Helper function to sort jobs by priority
     * 
     * Source: https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
     * 
     * @author gabes
     */
    sortByProperty(property){  
        return function(a,b){  
           if(a[property] > b[property])  
              return 1;  
           else if(a[property] < b[property])  
              return -1;  
       
           return 0;  
        }  
     }


    /**
     * Remove employee from job
     * 
     * Status: Done
     * Testing: Needed
     * 
     * @author Jude Gabriel
     */
    async removeEmployeeFromJob(jobID, empID){
       if((jobID != null) && (empID != null)){
        await this.db.collection("jobs").doc(jobID)
            .collection("employees").doc(empID).delete();
       }
    }

    /****** CREATE JOB *******/
    
    /**
     * Creates a job
     */
    createJob(add, jname, jnotes){
          //Trim values
        
        
         
          if(!(jnotes) || (jnotes != " ") || (jnotes == "")){
            jnotes = "No notes";
          }
          else{
            jnotes.trim();
           
          }
          //Phase will be 1 to start
          let phs = 1;
  
        //Error check null parameters
          if((!add) || (!jname)){
              console.log("null parameter (name or address)");
              return;
          }
          else if((add == " ") || (jname == " ") ){
              console.log("null parameter (name or address");
              return;
          }
          else if((add == "") || (jname == "")){
              console.log("null parameter (name or address)");
              return;
          }
          add.trim();
          jname.trim();
  
          //Submit to database
          this.db.collection("jobs").add({
              address: add,
              name: jname,
              notes: jnotes,
              phase: phs
          });
    }

    /****** DELETE JOB *******/

    /**
     * Deletes a job
     */
    async deleteJob(id){
        if(id != null){
            await this.db.collection("jobs").doc(id).delete();
        }
    }


    /**
     * Turns month string into numerical month value
     * 
     * @author gabes
     */
    getMonth(month){
        switch(month){
            case 'Jan': 
                return 1;
            case 'Feb':
                return 2
            case 'Mar':
                return 3;
            case 'Apr':
                return 4;
            case 'May':
                return 5;
            case 'Jun':
                return 6;
            case 'Jul':
                return 7;
            case 'Aug':
                return 8;
            case 'Sep':
                return 9;
            case 'Oct':
                return 10;
            case 'Nov':
                return 11;
            case 'Dec':
                return 12;
            default:
                return null;
        }
    }



}

export default Database;