Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {name: 'tagsList',
  waitOn: function() {
    return Meteor.subscribe('tagsListApproved');
  },
  data: function() {
    console.log(Tags.find());
    return Tags.findOne();
  }
});


Router.route('/tag/submit', {name: 'tagSubmit'});

Router.route('/tag/:name', {
  name: 'tagPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleTag', this.params.name),
      Meteor.subscribe('markersByTag', this.params.name)
    ];
  }
});

Router.route('/admin/tag', {name: 'tagApprove',
  waitOn: function() {
    return Meteor.subscribe('tagsListAll');
  },
  data: function() { return Tags.find(); }
});

Router.route('/tagger/addMarker', {name: 'markerAdd'});
/*
Router.route('/personnesMap', {name: 'personnesMap',
  waitOn: function() {
    return Meteor.subscribe('personnesAdmin');
  },
  data: function() { return Personnes.find(); }
});
*/
