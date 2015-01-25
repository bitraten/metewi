"use strict";

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    waitOn: function() { return [Meteor.subscribe('items'), Meteor.subscribe('userData')]; }
});

Router.route('home', function() {
        this.render('home');
        this.render('sidebar', {to: 'left'});
    },{
    path: '/',
    data: {items: function() { return Items.find({}, {'sort': {'created_at': -1}}); }},
    fastRender: true
});

Router.route('/item/:_id', function() { 
        this.render('itemPage');
        this.render('itemParams', {to: 'right'});
    },{
    name: 'item.show',
    data: function() { return Items.findOne(this.params._id); }
});

Router.route('/item/:_id/edit', {
    name: 'item.edit',
    data: function() { return Items.findOne(this.params._id); }
});

var requireAdmin = function() {
    if(mayEdit()) {
        this.next();
    } else {
        this.render('accessDenied');
    }
}

// Show notFound for invalid request on valid routes.
Router.onBeforeAction('dataNotFound', {only: ['item.show', 'item.edit']});
Router.onBeforeAction(requireAdmin, {only: 'item.edit'});
