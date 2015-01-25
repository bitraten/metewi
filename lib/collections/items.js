Items = new Mongo.Collection('items');

Items.allow({
    insert: function() {return mayEdit();},
    update: function() {return mayEdit();}
});
