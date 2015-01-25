mayEdit = function() {
    return Meteor.userId() ? Meteor.user().role === 'admin' : false;
};
