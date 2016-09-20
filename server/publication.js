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
Meteor.publish('markersByTag', function(tagName) {
  return Markers.find({tagsArray: tagName});
});

  // /marker/list
Meteor.publish('markersAll', function() {
  return Markers.find();
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
