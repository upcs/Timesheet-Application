// For storing login and db info across components

let User = {
    _id: null,
    _user: null,
    
    getId: function() {
        return this._id;
    },
    setId: function(id) {
        this._id = id;
    },

    getUser: function() {
        return this._user;
    },

    setUser: function(user) {
        this._user = user;
    }

}

export default User;