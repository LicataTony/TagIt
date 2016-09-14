Meteor.publish('tagsListApproved', function() {
  return Tags.find({approved: true});
});

Meteor.publish('tagsListAll', function() {
  return Tags.find();
});

Meteor.publish('tagsListPrivate', function() {
  return Tags.find({private: true});
});
/*
Meteor.publish('personnesList', function() {
  var argRequest =    {$and: [
        {$or: [{hidden: {$exists: false}},{hidden: false}]},
        {$or: [{blocked: {$exists: false}},{blocked: false}]}
  ]};
  var fields  = {fields: {nom: false}};
  var publication = Personnes.find(argRequest, fields);
  return publication;
});
*/
