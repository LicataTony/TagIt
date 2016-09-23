Meteor.methods({
  pinAdd: function(pinDatas){
    check(pinDatas, {
      tagsArray: Array,
      date: Date,
      beginHour: String,
      endHour: String,
      lat: Number,
      lng: Number,
      location: String,
      name: String,
      url: String,
      imageId: String
    });
    var ok = true;
    pinDatas.tagsArray.forEach(function(tagName){
      if(!Tags.findOne({tagName: tagName}) || !Tags.findOne({tagName: tagName}).approved) ok = false;
    });
    if(ok){
      // Pins.insert(pinDatas);
      Pins.insert({tagsArray: pinDatas.tagsArray, date: pinDatas.date, beginHour: pinDatas.beginHour, endHour: pinDatas.endHour, lat: pinDatas.lat, lng: pinDatas.lng, location: pinDatas.location, name: pinDatas.name, url: pinDatas.url, imageId: pinDatas.imageId});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  },
  pinEdit: function(pinDatas){
    check(pinDatas, {
      _id: String,
      tagsArray: Array,
      date: Date,
      beginHour: String,
      endHour: String,
      lat: Number,
      lng: Number,
      location: String,
      name: String,
      url: String,
      imageId: String
    });
    var ok = true;
    pinDatas.tagsArray.forEach(function(tagName){
      if(!Tags.findOne({tagName: tagName}) || !Tags.findOne({tagName: tagName}).approved || !Pins.findOne(pinDatas._id)) ok = false;
    });
    if(ok){
      // Pins.insert(pinDatas);
      Pins.update({_id: pinDatas._id},{$set: {tagsArray: pinDatas.tagsArray, date: pinDatas.date, beginHour: pinDatas.beginHour, endHour: pinDatas.endHour, lat: pinDatas.lat, lng: pinDatas.lng, location: pinDatas.location, name: pinDatas.name, url: pinDatas.url, imageId: pinDatas.imageId}});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  }
});
