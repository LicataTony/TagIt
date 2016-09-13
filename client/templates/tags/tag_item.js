Template.tagItem.helpers({
  tagName: function(){
    return this.name;
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
  'click .delete': function(){
    Meteor.call('tagDelete', this._id);
  }
});
