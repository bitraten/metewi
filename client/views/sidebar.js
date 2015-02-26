"use strict";

Template.sidebar.events({
    'keypress input.add-item': function(e) {
        if (e.which === 13) {
            var title = $(e.target).val();

            Meteor.call('itemInsert', title, function(error, result){
              // display the error to the user and abort
              if (error) {
                return alert(error.reason);
              }

              // show this result but route anyway
              if (result.itemExists){
                alert('An item with this title already exists!');
              }

                Router.go('item.edit', {_id: result._id});
            });
        }
    }
});
