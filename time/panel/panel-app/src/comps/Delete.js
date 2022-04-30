import React from 'react';
import react from 'react';

class Delete extends React.Component {

    constructor(props) {
        super(props);
        /*
            this.props: {
                selectedId: (number);
                selected: (userObject);
                setSelected: function();
            }
        */
    }
    render() {
        const { firstname } = this.props.selected;
        return (
            <div className="download delete button" onClick={() => this.deleteUser()}>Delete</div>
        )
    }
}

export default Delete;