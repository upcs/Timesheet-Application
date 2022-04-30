import React from 'react';
import Data from '../util/Database';
import SheetMaker from '../util/SheetMaker';

const firebaseToObjPunch =  function(firebaseData, firstname, lastname) {
    const { timeIn, timeOut, jobName } = firebaseData;
    const durationMs = timeOut - timeIn;
    const dateIn = new Date(timeIn);
    const dateOut = new Date(timeOut);
    const fromDateStr = dateIn.toDateString();
    const toDateStr = dateOut.toDateString();
    const fromTimeStr = dateIn.toLocaleTimeString();
    const toTimeStr = dateOut.toLocaleTimeString();
    return {
        fromDateStr, fromTimeStr, toDateStr, toTimeStr,
        lastname, firstname,
        jobName,
        timeIn, timeOut,
    }
}
class Download extends React.Component {
    getData() {
        const data = {}
        const punchPromises = [];
        const punches = [];
        const myData = Data.getAllAccounts().then(results => {
            results.forEach(result => {
                const { firstname, lastname } = result.data();
             
                const userPunchPromise = result.ref.collection('punch').get();
                punchPromises.push(userPunchPromise);
                userPunchPromise.then((results2) => {
                    //console.log('user found', results2);
                    results2.forEach(result2 => {
                        console.log('result found');
                        if (result2 == undefined) {
                            console.warn('No punches found for this user');
                            return;
                        }
                        const data = result2.data();
                        const entry = firebaseToObjPunch(data, firstname, lastname);
                        punches.push(entry);
                    })
                    
                })
            });
            Promise.allSettled(punchPromises).then(() => {
                console.log(punches);
                console.log(SheetMaker.makeWorkbook(punches))
            });
            
        });
       
    }
    render() {
        return (
            <div className="download bigbutton button" onClick={() => this.getData()}>Download 2 Weeks</div>
        )
    }
}

export default Download;