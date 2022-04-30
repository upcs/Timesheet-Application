/* eslint-disable no-undef */
import React from 'react';
import uuidv4 from '../util/UUID';

import Search from './Search';
import Download from './Download';
import Data from '../util/Database';
import Edit from './Edit';
import Delete from './Delete';
class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                accounts: {},
            },
            selectedId: null,
            selected: {},
        }
        //console.log("FROM PANEL: ", firebase) //eslint-disable-line
        this.getUsersByName = this.getUsersByName.bind(this);
        this.getAllAccounts = this.getAllAccounts.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
    }

    getAllAccounts() {
        return Object.values(this.state.data.accounts) || [];
    }

    

    componentDidMount() {
        if ( !firebase ) return;
        Data.getAllAccounts().then(results => {
            const accounts = {};
            
            results.forEach(element => {
                const account = element.data();
                const id = uuidv4();
                account.name = account?.firstname + " " + account?.lastname;
                account.id = id;
                accounts[id] = account;
            });
            console.log(accounts);
            this.setState({data: {accounts}})
        })
       
        
    }

    getUsersByName(query) {
        console.log("QUERY", query);
        return this.getAllAccounts().filter(({firstname}) => firstname && firstname.indexOf && (firstname.indexOf(query) > -1));
    }
    setSelectedUser(id) {
        const user = this.state.data.accounts[id];
        if (user == undefined) {
            // somethings gone wrong
            return
        }
        this.setState({
            selectedId: id,
            selected: user
        });
    }
    getUserById(id) {
        if (id == null) return {};
        const user = this.state.data.accounts[id];
        return user;
    }

    runAsyncUpdate(promise) {
        this.setState({loading: true},
            )
    }


    render() {
        const { getUsersByName } = this;
        const { selected, selectedId } = this.state;
        console.log({selected});
        const { firstname, lastname, admin } = selected;
        let periodElementsList = [<tr><td>Start Date:</td><td>Time Worked</td><td>Overtime:</td></tr>];
        if (selectedId !== null) {
            let periods = Data.getCurrentPeriods(3);
            periods.forEach(({start, end, time, startDate, overtime}) => {
                let classname = overtime > 0 ? "hasOvertime" : "";
                periodElementsList.push(
                    <tr>
                        <td>{startDate}</td><td>{time}</td><td className={classname}>{overtime}</td>
                    </tr>
                )
            });
            
        }
        return (
            <div className="panelOuter">
                <div className="panelTop">
                    <h1>Admin Panel (Cont.)</h1>
                    <Download></Download>
                </div>
                <div className="panelMiddle"></div>
                <div className="panelBody">
                    <div className="bodyLeft">
                        <Search 
                            data={{getUsersByName}}
                            setSelectedUser={this.setSelectedUser}
                            selectedId={this.state.selectedId}
                        ></Search>
                    </div>
                    <div className="bodyRight userOuter">
                        {(selectedId !== null) ? 
                            <div className="userTop">
                                <div className="userName">
                                    <h2>{firstname + " " + lastname}</h2>
                                    <div className="userNameIcon"></div>
                                    <Edit selected={selected} selectedId={selectedId}></Edit>
                                    <Delete selected={selected} selectedId={selectedId}></Delete>
                                </div>
                                <div className="userStatsOuter">
                                    <div>Time worked this period:</div>
                                    <table className="userStatsTable">
                                        {periodElementsList}
                                    </table>
                                </div>
                                <div>
                                    <h5>TBD: Jobsite Specific Hours</h5>
                                    <h5>TBD: </h5>
                                </div>
                            </div>
                            :
                            <><h4>Select a user to get started.</h4></>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Panel;