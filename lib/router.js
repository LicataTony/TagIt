Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {name: 'tagsList',
  waitOn: function() {
    return Meteor.subscribe('tagsListApproved');
  }
});


Router.route('/tag/submit', {name: 'tagSubmit'});

Router.route('/tag/:tagName', {
  name: 'tagPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleTag', this.params.tagName),
      Meteor.subscribe('markersByTag', this.params.tagName)
    ];
  }
});

Router.route('/admin/tag', {name: 'tagApprove',
  waitOn: function() {
    return Meteor.subscribe('tagsListAll');
  },
  data: function() { return Tags.find(); }
});

Router.route('/marker/list', {name: 'markersList',
  waitOn: function() {
    return Meteor.subscribe('markersAll');
  }
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
