Meteor.methods({
  markerAdd: function(markerDatas){
    check(markerDatas, {
      name: String,
      privateTag: String,
      x: Number,
      y: Number
    });
    console.log(markerDatas);
    var selectedTag = Tags.findOne({name: markerDatas.privateTag});
    if(selectedTag.approved){
    Markers.insert({name: markerDatas.name, privateTag: markerDatas.privateTag, x: markerDatas.x, y: markerDatas.y});
    }else{
      throw new Meteor.Error('invalide-privateTag', "This privateTag doesn't exist!")
    }
  }
});
