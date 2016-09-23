Meteor.methods({
  userAdd: function(userDatas){
    check(userDatas, {
      email: String,
      password: String,
      privateTag: String,
      webSite: String,
      description: String
    });
    var emailOk = true;
    var tagOk = true;
    if(Users.findOne({email: userDatas.email})) emailOk = false;
    if(Tags.findOne({tagName: userDatas.privateTag})) tagOk = false;
    if(emailOk && tagOk){
      Users.insert(userDatas, function(e, id){
        Tags.insert({_id: id, tagName: userDatas.privateTag, private: true, approved: true});
      });
    }else{
      if(!emailOk) throw new Meteor.Error('invalid-email', 'This E-Mail is already used!');
      if(!tagOk)   throw new Meteor.Error('invalid-tag', 'This tag is already used!');
    }
  },
  userDelete: function(userId){
    check(userId, String);
    Tags.remove(userId);
  }
})
