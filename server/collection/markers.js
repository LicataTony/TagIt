Meteor.methods({
  markerAdd: function(markerDatas){
    check(markerDatas, {
      tagsArray: Array,
      date: Date,
      beginHour: String,
      endHour: String,
      lat: Number,
      lng: Number,
      location: String,
      name: String,
      url: String,
      description: String
    });
    var ok = true;
    markerDatas.tagsArray.forEach(function(tagName){
      if(!Tags.findOne({tagName: tagName}) || !Tags.findOne({tagName: tagName}).approved) ok = false;
    });
    if(ok){
      Markers.insert({tagsArray: markerDatas.tagsArray, date: markerDatas.date, beginHour: markerDatas.beginHour, endHour: markerDatas.endHour, lat: markerDatas.lat, lng: markerDatas.lng, location: markerDatas.location, name: markerDatas.name, url: markerDatas.url, Description: markerDatas.description});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  }
});
