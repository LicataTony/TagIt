Template.pinItem.helpers({
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
    var image = Images.findOne(this.imageId); // tagname : params.tagname, id_pin : this._id
    return image;
  },
  adminPage: function(){
    var url = Router.current().route.getName();
    return url.indexOf('pinsList') !== -1;
  }
});

Template.pinItem.events({
  'click .edit': function(){
    Router.go("pinEdit", {_id: this._id});
  }
})
