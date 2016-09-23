  // /home
Meteor.publish('tagsListApproved', function() {
  return Tags.find({approved: true});
});

  // /admin/approve
Meteor.publish('tagsListAll', function() {
  return Tags.find();
});

  //?
Meteor.publish('tagsListPrivate', function() {
  return Tags.find({private: true});
});

  // /tag/"tagName"
Meteor.publish('singleTag', function(tagName) {
  return Tags.find({tagName: tagName});
});

  // /tag/"tagName"
Meteor.publish('pinsByTag', function(tagName) {
  return Pins.find({tagsArray: tagName});
});

// /edit/"_id"
Meteor.publish('pinsById', function(id) {
  return Pins.find({_id: id});
});

  // /pin/list
Meteor.publish('pinsAll', function() {
  return Pins.find();
});

//TODO lib image
Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
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
