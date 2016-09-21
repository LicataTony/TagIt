Template.markerItem.helpers({
  name: function(){
    return this.name;
  },
  tag: function(){
    var tags = '';
    this.tagsArray.forEach(function(tag){
      tags += tag + ' ';
    });
    return tags;
  },
  date: function(){
    date = new Date(this.date);
    return date.toDateString();
  },
  hours: function(){
    return this.beginHour+' - '+this.endHour;
  },
  location: function(){
    return this.location;
  },
  imageFile: function(){
    var image = Images.findOne(this.imageId); // tagname : params.tagname, id_marker : this._id
    return image;
  }
});
