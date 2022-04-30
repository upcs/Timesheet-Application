/* eslint-disable no-undef */

import React from 'react';
import UserSearchResult from './UserSearchResult';
class Search extends React.Component {
    constructor(props) {
        super(props);

        
    
        const { firebase } = props;
        
        this.state = {
            shownUsers: [],
            input: "",
        }
    }

    componentDidMount() {
        this.getUsersByName('');
    }
    getUsersByName(query) {
        const shownUsers = this.props.data?.getUsersByName(query) || [];
        console.log(shownUsers);
        this.setState({shownUsers});
    }

    render() {
        //const { getUsersByName } = this;

        const userEls = this.state.shownUsers.map(user => 
            <UserSearchResult 
                user={user}
                setSelectedUser={this.props.setSelectedUser}
                isSelected={user.id == this.props.selectedId}
            >
            </UserSearchResult>
        );

        
        return (
            <div style={{width:"100%",height:"100%"}}>
                <div className="searchTop">
                    <textarea 
                        onChange={(e) => {
                            this.getUsersByName(e.target.value);
                        }}
                        placeholder="Search name here..."
                    ></textarea>
                </div>
                <div className="searchBody">{userEls.length ? userEls : "No users found."}</div>
            </div>
        )    
    }
}

export default Search;