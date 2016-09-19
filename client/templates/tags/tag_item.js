Template.tagItem.helpers({
  tagName: function(){
    return this.tagName;
  },
  isAdmin: function(){
    return (Router.current().route.getName().indexOf('tagApprove') !== -1);
  },
  private: function(){
    if(this.private) return 'Tag privé';
  },
  approved: function(){
    if(this.approved) return 'checked';
    return '';
  }
});

Template.tagItem.events({
  'change .approved': function(e){
    Meteor.call('tagApprove', {id: this._id, approved: ($(event.target).is(":checked"))});
  },
  'click .list': function(){
    Router.go('markerTagList', {tagName: this.tagName});
  },
  'click .delete': function(){
    Meteor.call('tagDelete', this._id);
  }
});
