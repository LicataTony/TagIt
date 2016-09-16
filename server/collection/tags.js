Meteor.methods({
  tagAdd: function(tagDatas){
    check(tagDatas, {
      tagName: String,
      private: Boolean
    });
    if(Tags.findOne({tagName: tagDatas.tagName})) {
      throw new Meteor.Error('invalid-tag', 'This tag is already taken!');
    }else{
      Tags.insert({tagName: tagDatas.tagName, private: tagDatas.private});
    }
  },
  'tagApprove': function(args){
    check(args, {
      id: String,
      approved: Boolean
    });
    Tags.update({_id: args.id}, {$set: {approved: args.approved}});
  },
  'tagDelete': function(tagId){
    check(tagId, String);
    Tags.remove(tagId);
  }
})
