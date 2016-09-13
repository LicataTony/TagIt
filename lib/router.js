Router.configure({
  layoutTemplate: 'layout'
});

/*
Router.route('/', {name: 'personnesList',
  waitOn: function() {
    return Meteor.subscribe('personnesList');
  },
  data: function() { return Personnes.find(); }
});

Router.route('/personnesAdmin', {name: 'personnesAdmin',
  waitOn: function() {
    return Meteor.subscribe('personnesAdmin');
  },
  data: function() { return Personnes.find(); }
});

Router.route('/personneAdd', {name: 'personneAdd'});

Router.route('/personnesMap', {name: 'personnesMap',
  waitOn: function() {
    return Meteor.subscribe('personnesAdmin');
  },
  data: function() { return Personnes.find(); }
});
*/
