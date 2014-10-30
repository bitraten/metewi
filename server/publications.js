Meteor.publish('items', function() {
    return Items.find({visibility: "public"});
});
