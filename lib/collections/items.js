Items = new Mongo.Collection('items');

Items.allow({
    insert: function() {return mayEdit();},
    update: function() {return mayEdit();}
});

AdminUser = Match.Where(function (user) {
  check(user, Object);
  return user.role === 'admin';
});

Meteor.methods({
  itemInsert: function(title) {
    check(Meteor.user(), AdminUser);
    check(title, String);

    var item = {
      created_at: new Date(),
    };

    if(title) {
      item = _.extend(item, {
        _id: URLify2(title),
        title: title
      });
    }

    if(Items.findOne(item._id)) {
      return {
        itemExists: true,
        _id: item._id
      };
    }

    var itemId = Items.insert(item);

    return {
      _id: itemId
    };
  }
});
