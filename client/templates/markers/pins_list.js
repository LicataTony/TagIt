Template.pinsList.helpers({
  pins: function(){
    return Pins.find({},{sort: {date: 1}});
  }
});

Template.pinsList.onRendered(function(){
  /*
    var pinsByDay = Pins.aggregate(
      [
        {
          $group : {
            _id: { month: {$month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
            pins: {$push: {description: "$description", tagsArray: "$tagsArray"}}
          }
        }
      ]
    );
    console.log(pinsByDay);
    */
});
