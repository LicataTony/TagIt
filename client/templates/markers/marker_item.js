Template.markerItem.helpers({
  description: function(){
    return this.description;
  },
  tag: function(){
    return this.tag;
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
