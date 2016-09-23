Router.onBeforeAction(function() {
  GoogleMaps.load({
    key: 'AIzaSyA_94HLT95IdrUPGeHJH5tzOMggVUQ-MfQ',
    libraries: 'places'
  });
  this.next();
}, { only: ['pinAdd','pinEdit'] });

Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {name: 'tagsList',
  waitOn: function() {
    return Meteor.subscribe('tagsListApproved');
  }
});


Router.route('/tag/submit', {name: 'tagSubmit'});

Router.route('/list/:tagName', {
  name: 'pinTagList',
  waitOn: function() {
    return [
      Meteor.subscribe('singleTag', this.params.tagName),
      Meteor.subscribe('pinsByTag', this.params.tagName),
      //TODO lib image
      Meteor.subscribe('files.images.all')
    ];
  }
});

Router.route('/map/:tagName', {
  name: 'tagPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleTag', this.params.tagName),
      Meteor.subscribe('pinsByTag', this.params.tagName),
      //TODO lib image
      Meteor.subscribe('files.images.all')
    ];
  }
});

Router.route('/admin/tag', {name: 'tagApprove',
  waitOn: function() {
    return Meteor.subscribe('tagsListAll');
  },
  data: function() { return Tags.find(); }
});

Router.route('/pin/list', {name: 'pinsList',
  waitOn: function() {
    return [Meteor.subscribe('pinsAll'),
            //TODO lib image
            Meteor.subscribe('files.images.all')];
  }
});

Router.route('/add/:tag?', {name: 'pinAdd',
  data: function(){
    return [this.params.tag,
            //TODO lib image
            Meteor.subscribe('files.images.all')]
  }
});

Router.route('/edit/:_id', {name: 'pinEdit',
  waitOn: function(){
    return Meteor.subscribe('pinsById', this.params._id);
  }
});

Router.route('/register', {name: 'userSubscribe'});
/*
Router.route('/personnesMap', {name: 'personnesMap',
  waitOn: function() {
    return Meteor.subscribe('personnesAdmin');
  },
  data: function() { return Personnes.find(); }
});
*/
