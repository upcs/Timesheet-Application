import React from 'react'

class UserSearchResult extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        console.log(`Attempted to set current user ${this.props.user.name} (${this.props.user.id})`)
        this.props.setSelectedUser(this.props.user.id);
    }

    render() {
        return (
            <div className={["userSearchResultOuter", this.props.isSelected && "selected"].join(' ')} onClick={() => this.onClick()}>
                <div>{this.props.user.firstname}</div>
                <div>{this.props.user.admin ? '★' : ''}</div>
            </div>
        )
    }
}

export default UserSearchResult;