Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {name: 'tagsList',
  waitOn: function() {
    return Meteor.subscribe('tagsList');
  },
  data: function() { return Tags.find(); }
});


Router.route('/tag/submit', {name: 'tagSubmit'});

Router.route('/admin/tag', {name: 'tagApprove',
  waitOn: function() {
    return Meteor.subscribe('tagsListAdmin');
  },
  data: function() { return Tags.find(); }
});
/*
Router.route('/personnesMap', {name: 'personnesMap',
  waitOn: function() {
    return Meteor.subscribe('personnesAdmin');
  },
  data: function() { return Personnes.find(); }
});
*/
