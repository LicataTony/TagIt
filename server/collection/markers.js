Meteor.methods({
  markerAdd: function(markerDatas){
    check(markerDatas, {
      name: String,
      tag: String,
      x: Number,
      y: Number
    });
    var selectedTag = Tags.findOne({name: markerDatas.tag});
    if(selectedTag != null && selectedTag.approved){
      Markers.insert({name: markerDatas.name, tag: markerDatas.tag, x: markerDatas.x, y: markerDatas.y});
    }else{
      throw new Meteor.Error('invalide-tag', "This tag doesn't exist!");
    }
  }
});
