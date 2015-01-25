"use strict";

Meteor.publish('items', function() {
    var user = Meteor.users.findOne(this.userId);
    var cond = {visibility: "public"};

    if (user && user.role === 'family') {
        cond = {visibility: {$in: ["public", "family"]}};
    }
    else if (user && user.role === 'admin') {
        cond = {};
    }

    return Items.find(cond);
});

Meteor.publish('userData', function() {
    if (this.userId) {
        return Meteor.users.find({'_id': this.userId}, {fields: {'role': 1}});
    } else {
        this.ready();
    }
});
