Meteor.methods({
  markerAdd: function(markerDatas){
    check(markerDatas, {
      description: String,
      tagsArray: Array,
      date: Date,
      beginHour: String,
      endHour: String,
      lat: Number,
      lng: Number
    });
    var ok = true;
    markerDatas.tagsArray.forEach(function(tagName){
      if(!Tags.findOne({tagName: tagName}) || !Tags.findOne({tagName: tagName}).approved) ok = false;
    });
    if(ok){
      Markers.insert({description: markerDatas.description, tagsArray: markerDatas.tagsArray, date: markerDatas.date, beginHour: markerDatas.beginHour, endHour: markerDatas.endHour, lat: markerDatas.lat, lng: markerDatas.lng});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  }
});
