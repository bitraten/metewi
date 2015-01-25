"use strict";

Template.itemEdit.events({
    'click .add-param' : function (e) {
        var currentItemId = this._id;

        var keyField = $(e.target).parent().find('[name=new-param]');

        var newParam = {
            'key': keyField.val()
        };

        Items.update(currentItemId, {$push: {'params': newParam}}, function(error) {
            if (error) {
                alert(error.reason);
            }
            else {
               keyField.val(''); 
            }
        });
    },
    'click .del-param' : function (e) {
        var currentItemId = Template.parentData(1)._id;

        var key = $(e.target).parent().find('label').text();

        if(confirm('Really delete ' + key + '?')) {
            Items.update(currentItemId, {$pull: {'params': { 'key': key}}}, function(error) {
                if(error) {
                    alert(error.reason);
                }
            });
        }
    },
    'submit form' : function(e) {
        e.preventDefault();

        var self = this;

        var currentItemId = self._id;

        var params = $(e.target).find('.param').map(function() {
            var key = $(this).find('.key').text();
            var content = $(this).find('.value').val();
            return {'key': key, 'content': content};
        }).get();

        var itemProperties = {
            'title': $(e.target).find('[name=title]').val(),
            'content' : $(e.target).find('[name=content]').val(),
            'params' : params
        };

        Items.update(currentItemId, {$set : itemProperties}, function(error) {
            if(error) {
                alert(error.reason);
            } else {
                Router.go('item.show', {_id: self._id});
            }
        });
    },
    'click .cancel-button' : function(e) {
        if(confirm('Discard changes?')) {
            Router.go('item.show', {_id: this._id});
        }
    }
});
