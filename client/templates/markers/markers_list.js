Template.markersList.helpers({
  markers: function(){
    return Markers.find({},{sort: {date: 1}});
  }
});

Template.markersList.onRendered(function(){
  /*
    var markersByDay = Markers.aggregate(
      [
        {
          $group : {
            _id: { month: {$month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
            markers: {$push: {description: "$description", tagsArray: "$tagsArray"}}
          }
        }
      ]
    );
    console.log(markersByDay);
    */
});
