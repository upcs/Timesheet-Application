import React from 'react';
import react from 'react';

class Edit extends React.Component {

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
            <div className="download bigbutton button" onClick={() => this.launchEdit()}>Edit</div>
        )
    }
}

export default Edit;