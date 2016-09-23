import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';
import * as cookie from '/client/lib/cookie';

var pinId = "clickablePin";

var pinErrorKey = "pinError";

var notHidden = "notHidden";

var submitPinSuccess = "submitPinSuccess";

var submitPinError = "submitPinError";

var currentUploadedFileId = "currentUploadedFileId";

Template.pinEdit.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      // Trigger geocoding request.
      $("#lieu").geocomplete({
        details: ".geoloc" ,
        detailsAttribute: "data-geo"
      });
    }
  });
});

Template.pinEdit.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  },
  notHidden: function(){
    return session.get(notHidden);
  },
  color: function(){
    if(session.get(submitPinSuccess))  return 'background: #6D6; color: #111; font-weight: bold;';
    if(session.get(submitPinError))    return 'background: #D66; color: #111; font-weight: bold;';
  },
  text: function(){
    if(session.get(submitPinSuccess))  return 'Votre évenement a bien été modifié!';
    if(session.get(submitPinError))    return "Un ou plusieurs des tags que vous avez mentionné n'existe pas ou ne sont pas approuvés par l'administrateur!";
  },
  coorGps: function(){
    var latLng = session.get('latLng');
    if(latLng) return 'Latitude: '+latLng.lat+' Longitude: '+latLng.lng;
    return null;
  },
  tagParam: function(){
    var tagParam = Router.current().params.tag;
    return tagParam == undefined ? "" : tagParam;
  },
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  currentUploadedFileId: function(){
    return session.get(currentUploadedFileId);
  },
  currentImage: function(){
    return Images.findOne(session.get(currentUploadedFileId));
  },
  eventName: function(){
    return Pins.findOne().name;
  },
  tagsArray: function(){
    var tags = '';
    Pins.findOne().tagsArray.forEach(function(tag){
      if(tag) tags += tag+' ';
    });
    return tags;
  },
  year: function(){
    return Pins.findOne().date.getFullYear();
  },
  month: function(){
    return Pins.findOne().date.getMonth();
  },
  day: function(){
    return Pins.findOne().date.getDay();
  },
  beginHour: function(){
    return Pins.findOne().beginHour;
  },
  endHour: function(){
    return Pins.findOne().endHour;
  },
  formatted_address: function(){
    return Pins.findOne().location;
  },
  lat: function(){
    return Pins.findOne().lat;
  },
  lng: function(){
    return Pins.findOne().lng;
  },
  url: function(){
    return Pins.findOne().url;
  }
});

Template.pinEdit.onCreated(function(){
  session.clear(pinErrorKey);
  session.clear(notHidden);
  session.clear(submitPinSuccess);
  session.clear(submitPinError);
  session.clear('latLng');
  session.set('mapKey', 'clickableMap');
  this.currentUpload = new ReactiveVar(false);
});

var printErrorMessage = function(field){
  var pinError = session.get(pinErrorKey);
  if(pinError!=null){
    if(pinError[field]!=null){
      return pinError[field];
    }
  }
};

Template.pinEdit.events({
  'submit form': function(e,t) {
    $("#lieu").trigger("geocode");
    e.preventDefault();

    var data = getData(e);
    var pinError = {};

    var ok = controlData(data, pinError);
    if(ok){
      pinEdit(data);
    }else{
      displayErrorMessage(pinError);
    }
  },
  'click .reset-image': function(){
    session.clear(currentUploadedFileId);
  },
  'change #fileInput': function (e, template) {
    //TODO lib image
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({            // lib
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          session.set(currentUploadedFileId, fileObj._id);
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

var setPreferences = function(data){
  cookie.set('tagsArray', data.tagsArray);
  cookie.set('name', data.name);
  cookie.set('url', data.url);
  cookie.set('description', data.description);
  cookie.set('imageId', data.imageId);
};

var getData = function(e,t){
  var id = Pins.findOne()._id;
    //getPos
  var lat = parseFloat($(e.target).find('[data-geo=lat]').val());
  var lng = parseFloat($(e.target).find('[data-geo=lng]').val());
  if(isNaN(lat)) lat='';
  if(isNaN(lng)) lng='';

    //getLocation
  var location = $(e.target).find('[data-geo=formatted_address]').val();

    //getTags
  var tags = $(e.target).find('[id=tagsName]').val().toLowerCase();
  tagsArray = tags.split(" ");
  var tagsArrayWithoutVoid = [];
  tagsArray.forEach(function(tag){
    if(tag != '') tagsArrayWithoutVoid.push(tag);
  });
  tagsArray = tagsArrayWithoutVoid;

    //getDate
  var date = getDate(e);
  var beginHour = $(e.target).find('[id=beginHour]').val();
  var endHour = $(e.target).find('[id=endHour]').val();

    //getName
  var name = $(e.target).find('[id=name]').val();

    //getUrl
  var url = $(e.target).find('[id=url]').val();

    //getDescription
  var description = $(e.target).find('[id=description]').val();

  //TODO lib image
    //getImage
  var imageId = '';
  if(session.get(currentUploadedFileId)) imageId = session.get(currentUploadedFileId);

  return {_id: id, tagsArray: tagsArray, date: date, beginHour: beginHour, endHour: endHour, lat: lat, lng: lng, location: location, name: name, url: url, description: description, imageId: imageId};
};


var getDate = function(e){
  var year = parseInt($(e.target).find('[id=year]').val());
  var month = parseInt($(e.target).find('[id=month]').val())-1; //-1 because months start to 0
  var day = parseInt($(e.target).find('[id=day]').val());
  return new Date(year, month, day);
}

var controlData = function(data, pinError){
  if(data.tagsArray.length == 0)                                        pinError.tags = 'Veuillez entrer au moins un tag!';
  if(data.date == null || data.beginHour == '' || data.endHour == '')   pinError.date = 'Veuillez entrer une date valide!';
  if(data.lat == '' || data.lng == '' || data.location == '')           pinError.mapPos = 'veuillez entrer un lieu!';
  if(data.name == '')                                                   pinError.name = 'veuillez entrer un nom!';
  return Object.getOwnPropertyNames(pinError).length === 0;
};

var pinEdit = function(data){
  Meteor.call('pinEdit', data, function(e,r){
    session.set(notHidden, true);
    if(typeof e == 'undefined'){
      session.clear(pinErrorKey);
      session.set(submitPinError, false);
      session.set(submitPinSuccess, true);
      setPreferences(data);
    }else{
      console.log(e);
      session.set(submitPinSuccess, false);
      session.set(submitPinError, true);
    }
  });
};

var displayErrorMessage = function(pinError){
  session.set(pinErrorKey, pinError);
};
