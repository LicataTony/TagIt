Meteor.methods({
  markerAdd: function(markerDatas){
    check(markerDatas, {
      description: String,
      tag: String,
      date: Date,
      beginHour: String,
      endHour: String,
      lat: Number,
      lng: Number
    });
    var selectedTag = Tags.findOne({name: markerDatas.tag});
    if(selectedTag != null && selectedTag.approved){
      Markers.insert({description: markerDatas.description, tag: markerDatas.tag, date: markerDatas.date, beginHour: markerDatas.beginHour, endHour: markerDatas.endHour, lat: markerDatas.lat, lng: markerDatas.lng});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  }
});
