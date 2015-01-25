Template.sidebar.events({
    'keypress input.add-item': function(e) {
        if (e.which === 13) {
            var title = $(e.target).val();
            var item = {'title': title, 'created_at': Date.now()};

            Items.insert(item, function(error, _id) {
                if(error) {
                    alert(error.reason);
                } else {
                    Router.go('item.edit', {'_id': _id});
                }
            });
        }
    }
});
