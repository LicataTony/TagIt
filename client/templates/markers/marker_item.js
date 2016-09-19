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
  lat: function(){
    return this.lat;
  },
  lng: function(){
    return this.lng;
  }
});
