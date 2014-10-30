Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('items'); }
});

Router.route('home', {
    path: '/'
});

Router.route('/items/:_id', {
    name: 'itemPage',
    data: function() { return Items.findOne(this.params._id); }
});

// Show notFound for invalid request on valid routes.
Router.onBeforeAction('dataNotFound', {only: 'itemPage'});
