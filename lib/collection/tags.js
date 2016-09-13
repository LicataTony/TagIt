Tags = new Mongo.Collection('tags');

Meteor.methods({
  tagAdd: function(tagDatas){
    check(tagDatas, {
      name: String,
      private: Boolean
    });
    if(Tags.find({name: tagDatas.name})) {
      throw new Meteor.Error('invalid-tag', 'This tag is already taken!');
    }else{
      Tags.insert({name: tagDatas.name, private: tagDatas.private});
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
